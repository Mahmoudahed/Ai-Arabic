import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cc31123ae0b99a3358246b48fe3e089207a45131fafad63c332fbb09578958862468d5a47355555ac2d84e4a5c3dec7f212c59b898fb926cfb853f0d6c0f4429}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'أنت خبير في إنشاء خرائط ذهنية. قم بتحليل النص وإرجاعه على شكل JSON يحتوي على موضوع رئيسي ومجموعة مواضيع فرعية، وكل موضوع فرعي يحتوي على تفاصيل.'
          },
          {
            role: 'user',
            content: `النص: ${text}`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json({ error: `OpenAI Error: ${errorText}` }, { status: 500 });
    }

    const result = await aiResponse.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 });
    }

    const mindMapData = JSON.parse(content);

    return NextResponse.json({ mindMapData });
  } catch (error) {
    console.error('Error generating mind map:', error);
    return NextResponse.json(
      { error: 'Failed to generate mind map. Please try again.' },
      { status: 500 }
    );
  }
}
