import { Request, Response } from 'express'
import { User } from '../../models'
import mongoose from 'mongoose'

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { nickname, roomId, userId, email } = req.body

    try {
      const user = new User({ nickname, roomId, userId, email })
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error })
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users list', error })
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params

    try {
      const user = await User.findById(userId)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error })
    }
  }
}

export default new UserController()
