import { Router } from 'express'
import { ChatController } from '../../controllers'

class ChatRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.get('/users', ChatController.getAllUsers)
    this.router.get('/:email/messages', ChatController.getUserByEmail)
    this.router.get('/:userId', ChatController.getUserByUserId)
    this.router.post('/:email/create', ChatController.createUser)
    this.router.delete('/:userId/delete', ChatController.deleteUserUserId)
  }
}

export default new ChatRoutes().router
