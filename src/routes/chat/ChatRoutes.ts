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
    this.router.post('/add', ChatController.addUserMessage)
    this.router.post('/:email/create', ChatController.createUser)
    this.router.delete('/:email/delete', ChatController.deleteUserByEmail)
  }
}

export default new ChatRoutes().router
