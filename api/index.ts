import express from 'express'
import cors from 'cors'
import { Config } from '../src/config'
import { ErrorHandler } from '../src/middlewares'
import { Logger } from '../src/utils'
import { EmailRoutes, TelegramRoutes } from '../src/routes'

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

    const PORT = Config.getPort()
    this.app.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`)
    })
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
