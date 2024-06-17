import { Message, User } from '../../models'

class ChatService {
  public getUserByUserId = async (userId: string) => {
    const user = await User.findOne({ userId })
    return user
  }

  public deleteUserByUserId = async (userId: string) => {
    const user = await User.findOneAndDelete({ userId })

    if (!user) {
      throw new Error('User not found')
    }
  }

  public deleteChatByUserId = async (userId: string) => {
    const user = await User.findOneAndDelete({ userId })

    if (!user) {
      throw new Error('Chat not found')
    }
  }

  public deleteChatHistoryByUserId = async (userId: string) => {
    const user = await User.updateOne({ userId }, { $set: { messages: [] } })

    if (!user) {
      throw new Error('History messages not found')
    }
  }

  public getAllUsers = async () => {
    const users = await User.find()

    if (!users) {
      throw new Error('Users not found')
    }

    return users
  }

  public createUser = async (userName: string, userId: string) => {
    const existingUser = await User.findOne({ userId })

    if (!existingUser) {
      const newUser = new User({ userName, userId, messages: [] })
      await newUser.save()
      return newUser
    }

    return existingUser
  }
}

export default new ChatService()
