import { Request, Response } from 'express'
import { ChatService } from '../../services'

class ChatController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      const createdUser = await ChatService.createUser(email)
      const { userId, messages } = createdUser

      res.status(200).json({ email, userId, messages })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error:', error })
    }
  }

  public getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params
    const user = await ChatService.getUserByEmail(email)

    if (user) {
      const { email, messages, userId } = user
      res.status(200).json({ email, messages, userId })
    } else {
      res.status(404).json({ messageError: 'User not found' })
    }
  }

  public getUserByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await ChatService.getUserByUserId(userId)

    if (user) {
      const { email, messages, userId } = user
      res.status(200).json({ email, messages, userId })
    } else {
      res.status(404).json({ messageError: 'User not found' })
    }
  }

  public deleteUserUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      await ChatService.deleteUserUserId(userId)

      res
        .status(200)
        .json({ messageInfo: 'User has been deleted successfully' })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error', error })
    }
  }

  public getAllUsers = async (_: unknown, res: Response) => {
    try {
      const users = await ChatService.getAllUsers()
      res.status(200).json({ users })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error', error })
    }
  }
}

export default new ChatController()
