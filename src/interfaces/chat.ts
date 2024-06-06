export interface Message {
  sender: string
  content: string
  timestamp: Date
}

export interface User {
  email: string
  messages: Message[]
}
