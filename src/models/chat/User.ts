import { Schema, model, Document } from 'mongoose'
import { Message } from '../../interfaces'
import { messageSchema } from './Message'
import { v4 as uuidv4 } from 'uuid'

interface User extends Document {
  email: string
  messages: Message[]
  userId: string
}

export const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  messages: [messageSchema],
  userId: { type: String, default: uuidv4 },
})

export default model('User', userSchema)
