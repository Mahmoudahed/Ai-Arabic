import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { conversations } from '../../../lib/db/schema'
import { eq } from 'drizzle-orm'

// Set this route as static for the static export
export const dynamic = 'force-static';

// Mock session for static build
const getMockSession = () => ({
  user: {
    id: 'static-user-id',
    email: 'static@example.com',
    name: 'Static User'
  }
});

// Get session safely (for static builds)
const getSession = async () => {
  try {
    // Only import auth modules on the server, not during static build
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.NEXT_EXPORT) {
      const { getServerSession } = await import('next-auth');
      const { authOptions } = await import('../../../lib/auth');
      return await getServerSession(authOptions);
    }
    return getMockSession();
  } catch (error) {
    console.warn('Using mock session:', error);
    return getMockSession();
  }
};

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, session.user.id))
      .orderBy(conversations.updatedAt)

    return NextResponse.json(userConversations)
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, messages } = await req.json()

    const [conversation] = await db
      .insert(conversations)
      .values({
        userId: session.user.id,
        title,
        messages: JSON.stringify(messages),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error creating conversation:', error)
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, title, messages } = await req.json()

    const [conversation] = await db
      .update(conversations)
      .set({
        title,
        messages: JSON.stringify(messages),
        updatedAt: new Date(),
      })
      .where(eq(conversations.id, id))
      .returning()

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error updating conversation:', error)
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await req.json()

    await db
      .delete(conversations)
      .where(eq(conversations.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    )
  }
} 