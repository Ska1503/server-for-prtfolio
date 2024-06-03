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
    this.router.get('/users', UserController.getAllUsers)
    this.router.get('/users/:userId', UserController.getUserById)
  }
}

export default new UserRoutes().router
