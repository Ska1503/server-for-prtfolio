import { Schema, model, Document } from 'mongoose'
import { Message } from '../../interfaces'
import { messageSchema } from './Message'
import { v4 as uuidv4 } from 'uuid'

interface User extends Document {
  userName: string
  messages: Message[]
  userId: string
}

export const userSchema = new Schema<User>({
  userName: { type: String, required: true, unique: false },
  messages: [messageSchema],
  userId: { type: String, default: uuidv4, unique: true },
})

export default model('User', userSchema)
