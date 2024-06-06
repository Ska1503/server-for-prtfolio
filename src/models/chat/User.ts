import { Schema, model, Document, Types } from 'mongoose'
import { Message } from '../../interfaces'
import { messageSchema } from './Message'

interface User extends Document {
  email: string
  messages: Message[]
}

export const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  messages: [messageSchema],
})

export default model('User', userSchema)
