import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  try {
    console.log('Starting document scan request...')
    
    const formData = await req.formData()
    const document = formData.get('document') as File
    const language = formData.get('language') as 'en' | 'ar'

    console.log('Received form data:', {
      hasDocument: !!document,
      language,
      documentSize: document?.size,
      fileType: document?.type
    })

    if (!document) {
      console.error('No document file provided')
      return NextResponse.json(
        { error: 'يرجى اختيار ملف المستند' },
        { status: 400 }
      )
    }

    // Validate file size (max 20MB)
    if (document.size > 20 * 1024 * 1024) {
      console.error('File too large:', document.size)
      return NextResponse.json(
        { error: 'حجم الملف كبير جداً. الحد الأقصى 20 ميجابايت' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      console.error('Gemini API key is missing')
      return NextResponse.json(
        { error: 'مفتاح API غير موجود' },
        { status: 500 }
      )
    }

    console.log('Initializing Gemini AI...')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    // Convert document to base64
    console.log('Processing document file...')
    const documentBuffer = await document.arrayBuffer()
    const documentBase64 = Buffer.from(documentBuffer).toString('base64')

    let prompt = 'Extract only the important and relevant information from this document. Focus on:\n'
    prompt += '1. Key points and main ideas\n'
    prompt += '2. Important facts and figures\n'
    prompt += '3. Critical dates and deadlines\n'
    prompt += '4. Essential names and references\n'
    prompt += '5. Main conclusions or recommendations\n\n'
    prompt += 'Format the extracted information in a clear, organized manner. Exclude:\n'
    prompt += '- Unnecessary details\n'
    prompt += '- Repetitive information\n'
    prompt += '- Common knowledge\n'
    prompt += '- Irrelevant examples\n\n'
    
    if (language === 'ar') {
      prompt += 'Please provide the extracted information in Arabic.'
    }

    console.log('Generating content with prompt:', prompt)
    const result = await model.generateContent([
      {
        text: prompt
      },
      {
        inlineData: {
          mimeType: document.type,
          data: documentBase64
        }
      }
    ])

    const response = await result.response
    const text = response.text()

    if (!text) {
      console.error('No text extracted from document:', response)
      return NextResponse.json(
        { error: 'فشل في استخراج النص من المستند' },
        { status: 500 }
      )
    }

    // Create a temporary URL for the document
    const documentBlob = new Blob([documentBuffer], { type: document.type })
    const documentUrl = URL.createObjectURL(documentBlob)

    console.log('Document scan completed successfully')
    return NextResponse.json({ 
      extractedText: text,
      documentUrl
    })
  } catch (error) {
    console.error('Document scan error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { 
        error: 'فشل في مسح المستند',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    )
  }
} 