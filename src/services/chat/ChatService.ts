import { Message } from '../../interfaces'
import { User } from '../../models'

class ChatService {
  public getUserByEmail = async (email: string) => {
    let user = await User.findOne({ email })
    return user
  }

  public deleteUserByEmail = async (email: string) => {
    const user = await User.findOneAndDelete({ email })

    if (!user) {
      throw new Error('User not found')
    }
  }

  public getAllUsers = async () => {
    const users = await User.find()

    if (!users) {
      throw new Error('Users not found')
    }

    return users
  }

  public createUser = async (email: string) => {
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      const newUser = new User({ email, messages: [] })
      await newUser.save()
    }
  }

  public addUserMessage = async (email: string, message: Message) => {
    let user = await User.findOne({ email })

    if (!user) {
      user = new User({ email, messages: [message] })
    } else {
      user.messages.push(message)
    }
    await user.save()

    return message
  }
}

export default new ChatService()
