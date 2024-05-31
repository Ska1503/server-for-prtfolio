import { Schema, model, Document, Types } from 'mongoose'

interface User extends Document {
  nickname: string
  messages: Types.ObjectId[]
  roomId: string
  email: string
  userId: string
}

const id = crypto.randomUUID()

const userSchema = new Schema<User>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  roomId: { type: String, required: true },
  userId: { type: String, default: id },
})

export const User = model<User>('User', userSchema)
