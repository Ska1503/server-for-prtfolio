import { Request, Response } from 'express'
import { Message, User } from '../../models'
import { Types } from 'mongoose'

class MessageController {
  public async getMessageByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params

    try {
      const messages = await Message.find({ user: userId }).populate('text')
      res.status(200).json(messages)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error })
    }
  }

  public async createMessage(req: Request, res: Response): Promise<void> {
    const { userId, text, roomId } = req.body

    try {
      const message = new Message({ userId, text, roomId })
      await message.save()

      const user = await User.findById(userId)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      user.messages.push({ text: message.text, createdAt: message.createdAt })
      await user.save()

      res.status(201).json(message)
    } catch (error) {
      res.status(500).json({ message: 'Error creating message', error })
    }
  }
}

export default new MessageController()
