'use client'

import { useState, useRef } from 'react'
import { FaMicrophone, FaImage, FaTimes } from 'react-icons/fa'

interface VoiceAndImageInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onVoiceInput: (text: string) => void
  onImageUpload: (file: File) => void
  disabled?: boolean
}

export default function VoiceAndImageInput({
  value,
  onChange,
  onVoiceInput,
  onImageUpload,
  disabled = false
}: VoiceAndImageInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const formData = new FormData()
        formData.append('audio', audioBlob)

        try {
          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData
          })

          if (!response.ok) throw new Error('Failed to convert speech to text')

          const data = await response.json()
          onVoiceInput(data.text)
        } catch (error) {
          console.error('Error converting speech to text:', error)
        }

        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
      onImageUpload(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
          disabled={disabled}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-lg ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            disabled={disabled}
          >
            <FaMicrophone />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            disabled={disabled}
          >
            <FaImage />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>
      </div>
      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  )
} 