import { Router } from 'express'
import { MessageController } from '../../controllers'

class MessageRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.get('/message/:userId', MessageController.getMessages)
    this.router.post('/message', MessageController.createMessage)
  }
}

export default new MessageRoutes().router
