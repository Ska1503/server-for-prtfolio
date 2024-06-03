import { Schema, model, Document } from 'mongoose'

interface Message extends Document {
  userId: String
  text: string
  roomId: string
  createdAt: Date
}

const messageSchema = new Schema<Message>({
  userId: { type: String, ref: 'User', required: true },
  text: { type: String, required: true },
  roomId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Message = model<Message>('Message', messageSchema)
