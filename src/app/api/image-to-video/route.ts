import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    console.log('Starting image to video conversion...')
    
    const formData = await req.formData()
    const image = formData.get('image') as File
    const duration = formData.get('duration') as string || '5'
    const fps = formData.get('fps') as string || '30'

    console.log('Received form data:', {
      hasImage: !!image,
      imageSize: image?.size,
      imageType: image?.type,
      duration,
      fps
    })

    if (!image) {
      console.error('No image file provided')
      return NextResponse.json(
        { error: 'يرجى اختيار صورة' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      console.error('File too large:', image.size)
      return NextResponse.json(
        { error: 'حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      console.error('Invalid file type:', image.type)
      return NextResponse.json(
        { error: 'نوع الملف غير صالح. يرجى اختيار صورة' },
        { status: 400 }
      )
    }

    // Create temporary files
    const tempDir = tmpdir()
    const inputPath = join(tempDir, `input-${Date.now()}.${image.type.split('/')[1]}`)
    const outputPath = join(tempDir, `output-${Date.now()}.mp4`)

    // Write image to temporary file
    const imageBuffer = await image.arrayBuffer()
    await writeFile(inputPath, Buffer.from(imageBuffer))

    // FFmpeg command to convert image to video
    const ffmpegCommand = `ffmpeg -loop 1 -i "${inputPath}" -c:v libx264 -t ${duration} -pix_fmt yuv420p -vf "fps=${fps}" "${outputPath}"`

    console.log('Executing FFmpeg command:', ffmpegCommand)
    await execAsync(ffmpegCommand)

    // Read the generated video
    const videoBuffer = await readFile(outputPath)

    // Clean up temporary files
    await unlink(inputPath)
    await unlink(outputPath)

    console.log('Video conversion completed successfully')
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="output.mp4"'
      }
    })
  } catch (error) {
    console.error('Image to video conversion error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { 
        error: 'فشل في تحويل الصورة إلى فيديو',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    )
  }
} 