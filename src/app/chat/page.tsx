'use client'

import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { saveConversation, getConversations, updateConversation } from '@/utils/conversationStorage'
import VoiceAndImageInput from '@/components/VoiceAndImageInput'
import ConversationManager from '@/components/ConversationManager'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  imageUrl?: string
}

const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('ar')
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (messages.length > 0) {
        if (currentConversationId) {
          updateConversation(currentConversationId, messages)
        } else {
          saveConversation(messages)
        }
      }
    }
  }, [messages, currentConversationId])

  const handleNewConversation = () => {
    setMessages([])
    setCurrentConversationId(null)
    setInput('')
    setSelectedImage(null)
  }

  const handleConversationSelect = (conversationId: string) => {
    const conversations = getConversations()
    const conversation = conversations.find(c => c.id === conversationId)
    if (conversation) {
      setMessages(conversation.messages)
      setCurrentConversationId(conversationId)
      setInput('')
      setSelectedImage(null)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !selectedImage) return

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      ...(selectedImage && { imageUrl: URL.createObjectURL(selectedImage) })
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('message', input)
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      formData.append('language', selectedLanguage)

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        timestamp: new Date().toISOString()
      }])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
      setSelectedImage(null)
    }
  }

  const handleVoiceInput = (text: string) => {
    setInput(text)
  }

  const handleImageUpload = (file: File) => {
    setSelectedImage(file)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ConversationManager
          currentMessages={messages}
          onConversationChange={setMessages}
          onNewConversation={handleNewConversation}
          onConversationSelect={handleConversationSelect}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[90%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow'
                }`}
              >
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="User uploaded"
                    className="max-w-full h-auto rounded-lg mb-2"
                  />
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p>جاري الرد...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleChatSubmit} className="space-y-4">
            <VoiceAndImageInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onVoiceInput={handleVoiceInput}
              onImageUpload={handleImageUpload}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || (!input.trim() && !selectedImage)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 