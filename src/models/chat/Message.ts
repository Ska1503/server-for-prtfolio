import { Schema, model, Document } from 'mongoose'
interface Message extends Document {
  sender: string
  content: string
  timestamp: Date
}

export const messageSchema = new Schema<Message>({
  sender: { type: String, required: true },
  content: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
})

export default model('Message', messageSchema)
