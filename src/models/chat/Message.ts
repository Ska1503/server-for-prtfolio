import { Schema, model, Document, Types } from 'mongoose'

interface Message extends Document {
  user: Types.ObjectId
  text: string
  createdAt: Date
}

const messageSchema = new Schema<Message>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Message = model<Message>('Message', messageSchema)
