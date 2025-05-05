import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const message = formData.get('message') as string
    const image = formData.get('image') as File | null
    const language = formData.get('language') as string || 'ar'

    if (!message && !image) {
      return NextResponse.json({ error: 'No message or image provided' }, { status: 400 })
    }

    // Handle image if present
    let imageUrl = null
    if (image) {
      const tempDir = tmpdir()
      const imagePath = join(tempDir, `image-${Date.now()}.${image.name.split('.').pop()}`)
      const imageBuffer = await image.arrayBuffer()
      await writeFile(imagePath, Buffer.from(imageBuffer))
      imageUrl = imagePath
    }

    // Process the message and image with Gemini AI
    const response = await processWithGemini(message, imageUrl, language)

    // Clean up temporary image file if it exists
    if (imageUrl) {
      await unlink(imageUrl)
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}

async function processWithGemini(message: string, imageUrl: string | null, language: string) {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  // Create language-specific prompts
  const prompts = {
    ar: `أنت مساعد ذكي يتحدث العربية. أجب على السؤال التالي بطريقة واضحة ومفيدة:
${message}`,
    en: `You are an intelligent assistant. Please answer the following question in a clear and helpful way:
${message}`,
    fr: `Vous êtes un assistant intelligent. Veuillez répondre à la question suivante de manière claire et utile:
${message}`,
    es: `Eres un asistente inteligente. Por favor, responde a la siguiente pregunta de manera clara y útil:
${message}`,
    de: `Sie sind ein intelligenter Assistent. Bitte beantworten Sie die folgende Frage klar und hilfreich:
${message}`
  }

  const prompt = prompts[language as keyof typeof prompts] || prompts.en

  if (imageUrl) {
    // Handle image analysis
    const imageData = await readFile(imageUrl)
    const imageBase64 = imageData.toString('base64')
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg'
      }
    }
    
    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    return response.text()
  } else {
    // Handle text-only
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }
} 