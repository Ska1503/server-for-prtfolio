import { User } from '../../models'

class ChatService {
  public getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email })
    return user
  }

  public getUserByUserId = async (userId: string) => {
    const user = await User.findOne({ userId })
    return user
  }

  public deleteUserUserId = async (userId: string) => {
    const user = await User.findOneAndDelete({ userId })

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
      return newUser
    }

    return existingUser
  }
}

export default new ChatService()
