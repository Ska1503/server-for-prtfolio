import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './db'
import { Config } from './config'
import { ErrorHandler, SocketHandler } from './middlewares'
import { Logger } from './utils'
import { ChatRoutes, EmailRoutes, TelegramRoutes } from './routes'

const PORT = Config.getPort()
class App {
  public app: express.Application
  public server: http.Server
  public io!: Server

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.config()
    this.routes()
    this.errorHandling()
    this.logInfo()
    this.initializeSocket()
  }

  private config(): void {
    Config.loadConfig()
    connectDB.connect()
    this.app.use(cors())
    this.app.use(express.json())
    this.server.listen(PORT, () =>
      Logger.info(`Server is running on port ${PORT}`)
    )
  }

  private routes(): void {
    this.app.use('/api/chat', ChatRoutes)
    this.app.use('/api/telegram', TelegramRoutes)
    this.app.use('/api/email', EmailRoutes)
  }

  private errorHandling(): void {
    this.app.use(ErrorHandler.handle)
  }

  private initializeSocket(): void {
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
      },
    })

    new SocketHandler(this.io)
  }

  private logInfo(): void {
    Logger.info('Server started')
  }
}

export default new App().app
