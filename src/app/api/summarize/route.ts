import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

// Helper function to convert file to GenerativeAI.Part
const fileToGenerativePart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1]
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        }
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const text = formData.get('text') as string
    const file = formData.get('file') as File

    if (!text && !file) {
      return NextResponse.json({ error: 'No text or file provided' }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured')
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = text ? `لخص النص التالي بشكل مبسط وواضح:\n\n${text}` : 'لخص محتوى الصورة التالية:'

    const contentParts: any[] = [prompt]
    
    if (file) {
      const imagePart = await fileToGenerativePart(file)
      contentParts.push(imagePart)
    }

    const result = await model.generateContent(contentParts)
    const response = await result.response
    const summary = response.text()

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Summarization error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to summarize content' },
      { status: 500 }
    )
  }
} 