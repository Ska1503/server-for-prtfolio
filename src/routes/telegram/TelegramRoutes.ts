import { Router } from 'express'
import { TelegramController } from '../../controllers'

class TelegramRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.post('/sendMessage', TelegramController.sendMessage)
    this.router.get('/getUpdates', TelegramController.getUpdates)
  }
}

export default new TelegramRoutes().router
