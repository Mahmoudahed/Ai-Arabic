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

export const saveConversation = (messages: Message[]) => {
  if (messages.length === 0) return

  try {
    const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '')
    const conversation: Conversation = {
      id: Date.now().toString(),
      title,
      messages,
      lastUpdated: new Date().toISOString()
    }

    const conversations = getConversations()
    conversations.push(conversation)
    localStorage.setItem('conversations', JSON.stringify(conversations))
  } catch (error) {
    console.error('Error saving conversation:', error)
  }
}

export const getConversations = (): Conversation[] => {
  try {
    const conversations = localStorage.getItem('conversations')
    return conversations ? JSON.parse(conversations) : []
  } catch (error) {
    console.error('Error getting conversations:', error)
    return []
  }
}

export const deleteConversation = (id: string) => {
  try {
    const conversations = getConversations()
    const filteredConversations = conversations.filter(conv => conv.id !== id)
    localStorage.setItem('conversations', JSON.stringify(filteredConversations))
  } catch (error) {
    console.error('Error deleting conversation:', error)
  }
}

export const updateConversation = (id: string, messages: Message[]) => {
  try {
    const conversations = getConversations()
    const index = conversations.findIndex(conv => conv.id === id)
    if (index !== -1) {
      const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '')
      conversations[index] = {
        ...conversations[index],
        title,
        messages,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem('conversations', JSON.stringify(conversations))
    }
  } catch (error) {
    console.error('Error updating conversation:', error)
  }
} 