import { Request, Response } from 'express'
import { User } from '../../models'

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
}

export default new UserController()
