import { Request, Response } from 'express'
import { Message } from '../../models'

class MessageController {
  public async getMessages(req: Request, res: Response): Promise<void> {
    const { userId } = req.params

    try {
      const messages = await Message.find({ user: userId }).populate(
        'user',
        'nickname'
      )
      res.status(200).json(messages)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error })
    }
  }

  public async createMessage(req: Request, res: Response): Promise<void> {
    const { userId, text } = req.body

    try {
      const message = new Message({ user: userId, text })
      await message.save()
      res.status(201).json(message)
    } catch (error) {
      res.status(500).json({ message: 'Error creating message', error })
    }
  }
}

export default new MessageController()
