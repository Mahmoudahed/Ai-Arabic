'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface DocumentScannerForm {
  document: FileList
  language: 'en' | 'ar'
}

export default function DocumentScanner() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [editedText, setEditedText] = useState('')
  const [documentUrl, setDocumentUrl] = useState('')
  const { register, handleSubmit, reset } = useForm<DocumentScannerForm>()

  const onSubmit = async (data: DocumentScannerForm) => {
    try {
      setIsLoading(true)
      setError('')
      setExtractedText('')
      setEditedText('')
      setDocumentUrl('')

      const formData = new FormData()
      formData.append('document', data.document[0])
      formData.append('language', data.language)

      const response = await fetch('/api/scan-document', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'فشل في مسح المستند')
      }

      setExtractedText(result.extractedText)
      setEditedText(result.extractedText)
      setDocumentUrl(result.documentUrl)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    // Here you can implement saving to a database or file
    alert('تم حفظ التعديلات')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText)
    alert('تم نسخ النص')
  }

  const handleReanalyze = () => {
    // Here you can implement reanalysis with different parameters
    alert('سيتم إعادة تحليل المستند')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
      <h1 className="text-3xl font-bold mb-8 text-center">
        مسح وتحويل المستندات
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            اختر ملف المستند
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
            {...register('document', { required: true })}
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            يدعم الملفات التالية: PDF, DOC, DOCX, TXT, RTF, ODT
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            لغة النص المستخرج
          </label>
          <select
            {...register('language', { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'جاري المسح...' : 'مسح المستند'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {extractedText && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">النص المستخرج</h2>
          {documentUrl && (
            <div className="mb-4">
              <iframe
                src={documentUrl}
                className="w-full h-96 border rounded"
                title="Document Preview"
              />
            </div>
          )}
          <div className="space-y-4">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                حفظ
              </button>
              <button
                onClick={handleCopy}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                نسخ
              </button>
              <button
                onClick={handleReanalyze}
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
              >
                إعادة تحليل
              </button>
            </div>
            <div className="relative">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-4 border rounded min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="قم بتعديل النص المستخرج..."
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {editedText.length} حرف
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 