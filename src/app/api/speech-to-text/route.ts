import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      return NextResponse.json({ error: 'لم يتم إرسال الملف الصوتي' }, { status: 400 })
    }

    // Save the audio file temporarily
    const tempDir = tmpdir()
    const inputPath = join(tempDir, `input-${Date.now()}.wav`)
    const outputPath = join(tempDir, `output-${Date.now()}.txt`)

    const audioBuffer = await audioFile.arrayBuffer()
    await writeFile(inputPath, Buffer.from(audioBuffer))

    // Use Whisper for speech recognition
    const whisperCmd = `whisper "${inputPath}" --output_format txt --output_dir "${tempDir}" --language ar`

    console.log('Executing Whisper command:', whisperCmd)
    await execAsync(whisperCmd)

    // Read the transcription
    const transcription = await readFile(outputPath, 'utf-8')

    // Clean up temporary files
    await unlink(inputPath)
    await unlink(outputPath)

    return NextResponse.json({ text: transcription.trim() })
  } catch (error) {
    console.error('Speech to text error:', error)
    return NextResponse.json(
      { error: 'فشل في تحويل الصوت إلى نص' },
      { status: 500 }
    )
  }
} 