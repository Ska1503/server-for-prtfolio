import { RequestHandler, Router } from 'express'
import { EmailController } from '../../controllers'

class EmailRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.post(
      '/sendEmail',
      EmailController.sendEmail as unknown as RequestHandler
    )
  }
}

export default new EmailRoutes().router
