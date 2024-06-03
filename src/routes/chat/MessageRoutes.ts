import { Router } from 'express'
import { MessageController } from '../../controllers'

class MessageRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.get('/messages/:userId', MessageController.getMessageByUserId)
    this.router.post('/createMessage', MessageController.createMessage)
  }
}

export default new MessageRoutes().router
