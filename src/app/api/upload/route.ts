import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// قراءة البودي كـ stream
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const duration = formData.get('duration') as string || '5';
    const zoomSpeed = formData.get('zoomSpeed') as string || '0.1';
    const panSpeed = formData.get('panSpeed') as string || '0.1';

    if (!file) {
      return NextResponse.json({ error: 'لم يتم إرسال الملف' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'نوع الملف غير صالح. يرجى اختيار صورة' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت' }, { status: 400 });
    }

    // حفظ الملف في uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, fileName);

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);

    const outputVideo = `${fileName}.mp4`;
    const outputPath = path.join(uploadsDir, outputVideo);

    // FFmpeg command with zoompan filter for smooth animation
    // The zoompan filter creates a smooth zooming and panning effect
    // 'zoom' parameter controls the zoom speed
    // 'x' and 'y' parameters control the panning direction and speed
    const ffmpegCmd = `ffmpeg -y -loop 1 -i "${filePath}" \
      -vf "zoompan=z='min(zoom+${zoomSpeed},1.5)':x='if(gte(zoom,1.5),x,x+${panSpeed})':y='if(gte(zoom,1.5),y,y+${panSpeed})':d=${duration}*25:s=1280x720" \
      -c:v libx264 -t ${duration} -pix_fmt yuv420p "${outputPath}"`;

    console.log('Executing FFmpeg command:', ffmpegCmd);
    await execAsync(ffmpegCmd);

    // Clean up the original image
    fs.unlinkSync(filePath);

    return NextResponse.json({ 
      videoUrl: `/uploads/${outputVideo}`,
      message: 'تم إنشاء الفيديو بنجاح'
    });
  } catch (error) {
    console.error('Error processing video:', error);
    return NextResponse.json(
      { error: 'فشل في معالجة الفيديو' },
      { status: 500 }
    );
  }
}
