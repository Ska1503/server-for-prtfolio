import { Schema, model, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
interface Message extends Document {
  sender: string
  text: string
  timestamp: Date
  messageId: string
}

export const messageSchema = new Schema<Message>({
  sender: { type: String, required: true },
  text: { type: String, required: false },
  timestamp: { type: Date, required: true, default: Date.now },
  messageId: { type: String, required: true, default: uuidv4 },
})

export default model('Message', messageSchema)
