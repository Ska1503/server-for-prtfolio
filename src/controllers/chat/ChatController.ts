import { Request, Response } from 'express'
import { ChatService } from '../../services'

class ChatController {
  public getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params
    const user = await ChatService.getUserByEmail(email)

    if (user) {
      res.status(200).json({ user })
    } else {
      res.status(404).json({ messageError: 'User not found' })
    }
  }

  public deleteUserByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      await ChatService.deleteUserByEmail(email)

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

  public createUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      const createdUser = await ChatService.createUser(email)

      res.status(200).json({ createdUser })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error:', error })
    }
  }

  public addUserMessage = async (req: Request, res: Response) => {
    try {
      const { email, message } = req.body
      let user = await ChatService.addUserMessage(email, message)

      res.status(201).json({ user })
    } catch (error) {
      res.status(500).json({ messageError: 'Internal Server Error:', error })
    }
  }
}

export default new ChatController()
