import { Schema, model, Document, Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { UserMessages } from '../../interfaces'

interface User extends Document {
  nickname: string
  messages: UserMessages[]
  roomId: string
  email: string
}

const userSchema = new Schema<User>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  messages: [{ type: Object, ref: 'Message' }],
  roomId: { type: String, default: uuidv4 },
})

export const User = model<User>('User', userSchema)
