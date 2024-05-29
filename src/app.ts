import express from 'express'
import cors from 'cors'
import { Config } from './config'
import { ErrorHandler } from './middlewares'
import { Logger } from './utils'
import { EmailRoutes, TelegramRoutes } from './routes'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.errorHandling()
    this.logInfo()
  }

  private config(): void {
    Config.loadConfig()
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api/telegram', TelegramRoutes)
    this.app.use('/api/email', EmailRoutes)
    this.app.get('/', (req, res) => {
      res.send('Server connected')
    })
  }

  private errorHandling(): void {
    this.app.use(ErrorHandler.handle)
  }

  private logInfo(): void {
    Logger.info('Server started')
  }
}

export default new App().app
