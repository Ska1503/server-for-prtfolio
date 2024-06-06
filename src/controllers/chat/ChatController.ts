import { Request, Response } from 'express'
import { ChatService } from '../../services'

class ChatController {
  public getUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      const messages = await ChatService.getUserByEmail(email)

      if (messages) {
        res.status(200).json({ messages })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public deleteUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      await ChatService.deleteUserByEmail(email)

      res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public getAllUsers = async (_: unknown, res: Response) => {
    try {
      const users = await ChatService.getAllUsers()
      res.status(200).json({ users })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public addUserMessage = async (req: Request, res: Response) => {
    try {
      const { email, message } = req.body
      let user = await ChatService.addUserMessage(email, message)

      res.status(201).json({ user })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }
}

export default new ChatController()
