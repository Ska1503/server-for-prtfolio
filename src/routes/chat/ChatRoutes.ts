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
    this.router.get('/:userId', ChatController.getUserByUserId)
    this.router.post('/:userName/create', ChatController.createUser)
    this.router.delete('/:userId/deleteUser', ChatController.deleteUserByUserId)
    this.router.delete('/:userId/deleteChat', ChatController.deleteChatByUserId)
  }
}

export default new ChatRoutes().router
