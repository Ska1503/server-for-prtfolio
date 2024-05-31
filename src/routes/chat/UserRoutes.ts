import { Router } from 'express'
import { UserController } from '../../controllers'

class UserRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.post('/createUser', UserController.createUser)
  }
}

export default new UserRoutes().router
