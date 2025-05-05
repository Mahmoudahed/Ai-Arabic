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

// Save a new conversation
export const saveConversation = (messages: Message[]): string => {
  const conversations = getConversations()
  
  const title = messages.length > 0 
    ? messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '')
    : 'New Conversation'
    
  const newConversation: Conversation = {
    id: Date.now().toString(),
    title,
    messages,
    lastUpdated: new Date().toISOString()
  }
  
  conversations.push(newConversation)
  localStorage.setItem('conversations', JSON.stringify(conversations))
  
  return newConversation.id
}

// Update an existing conversation
export const updateConversation = (conversationId: string, messages: Message[]): void => {
  const conversations = getConversations()
  const index = conversations.findIndex(c => c.id === conversationId)
  
  if (index !== -1) {
    conversations[index].messages = messages
    conversations[index].lastUpdated = new Date().toISOString()
    localStorage.setItem('conversations', JSON.stringify(conversations))
  }
}

// Get all conversations
export const getConversations = (): Conversation[] => {
  const conversationsJSON = localStorage.getItem('conversations')
  return conversationsJSON ? JSON.parse(conversationsJSON) : []
}

// Delete a conversation
export const deleteConversation = (conversationId: string): void => {
  let conversations = getConversations()
  conversations = conversations.filter(c => c.id !== conversationId)
  localStorage.setItem('conversations', JSON.stringify(conversations))
}

// Get a single conversation by ID
export const getConversation = (conversationId: string): Conversation | null => {
  const conversations = getConversations()
  return conversations.find(c => c.id === conversationId) || null
}

// Clear all conversations
export const clearAllConversations = (): void => {
  localStorage.removeItem('conversations')
} 