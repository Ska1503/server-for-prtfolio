import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import connectDB from './db'
import { Config } from './config'
import { ErrorHandler } from './middlewares'
import { Logger } from './utils'
import {
  EmailRoutes,
  MessageRoutes,
  TelegramRoutes,
  UserRoutes,
} from './routes'
import { ChatService } from './services'

const PORT = Config.getPort()
class App {
  public app: express.Application
  public server: http.Server
  public io: Server
  public chatService: ChatService

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.config()
    this.routes()
    // this.errorHandling()
    this.logInfo()
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })
    this.chatService = new ChatService(this.io)
    this.chatService.initialize()
  }

  private config(): void {
    Config.loadConfig()
    this.app.use(cors())
    this.app.use(express.json())
    connectDB.connect()
    this.app.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`)
    })
  }

  private routes(): void {
    this.app.get('/', (_, res) => res.send('Server connected'))
    this.app.use('/api/chat', UserRoutes)
    this.app.use('/api/chat', MessageRoutes)
    this.app.use('/api/telegram', TelegramRoutes)
    this.app.use('/api/email', EmailRoutes)
  }

  // private errorHandling(): void {
  //   this.app.use(ErrorHandler.handle)
  // }

  private logInfo(): void {
    Logger.info('Server started')
  }
}

export default new App().app
