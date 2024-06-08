export interface Message {
  sender: string
  text: string
  timestamp: Date
}

export interface User {
  email: string
  messages: Message[]
}
