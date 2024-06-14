import { Request, Response } from 'express'
import { ChatService } from '../../services'
import { TelegramGateway } from '../../gateways'

class ChatController {
  public createUser = async (req: Request, res: Response) => {
    try {
      const { userName } = req.params
      const { userId } = req.body

      const createdUser = await ChatService.createUser(userName, userId)
      await TelegramGateway.sendMessage(`User ${userName} has joined the chat`)

      const { messages } = createdUser

      res.status(200).json({ userName, userId, messages })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error', error })
    }
  }

  public getUserByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await ChatService.getUserByUserId(userId)

    if (user) {
      const { userName, messages, userId } = user
      res.status(200).json({ userName, messages, userId })
    } else {
      res.status(404).json({ messageError: 'User not found' })
    }
  }

  public deleteUserByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      await ChatService.deleteUserByUserId(userId)

      res
        .status(200)
        .json({ messageInfo: 'User has been deleted successfully' })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error', error })
    }
  }

  public deleteChatByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params

      await ChatService.deleteChatByUserId(userId)
      await TelegramGateway.sendMessage(`User has deleted chat`)

      res
        .status(200)
        .json({ messageInfo: 'Chat has been deleted successfully' })
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
