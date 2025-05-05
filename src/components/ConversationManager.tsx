'use client'

import { useState, useEffect } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { getConversations, deleteConversation } from '@/utils/conversationStorage'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  imageUrl?: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastUpdated: string
}

interface ConversationManagerProps {
  currentMessages: Message[]
  onConversationChange: (messages: Message[]) => void
  onNewConversation: () => void
  onConversationSelect: (conversationId: string) => void
}

export default function ConversationManager({
  currentMessages,
  onConversationChange,
  onNewConversation,
  onConversationSelect
}: ConversationManagerProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    const savedConversations = getConversations()
    setConversations(savedConversations)
  }, [])

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id)
    setConversations(prev => prev.filter(conv => conv.id !== id))
    if (currentMessages.length > 0) {
      onNewConversation()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">المحادثات</h2>
        <button
          onClick={onNewConversation}
          className="p-2 text-blue-500 hover:text-blue-600"
          title="محادثة جديدة"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(conversation => (
          <div
            key={conversation.id}
            className="flex items-center justify-between p-2 mb-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onConversationSelect(conversation.id)}
          >
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">{conversation.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(conversation.lastUpdated).toLocaleString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteConversation(conversation.id)
              }}
              className="p-1 text-red-500 hover:text-red-600"
              title="حذف المحادثة"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 