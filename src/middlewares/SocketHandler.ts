import { Server, Socket } from 'socket.io'
import { Logger } from '../utils'

export class SocketHandler {
  private io: Server

  constructor(io: Server) {
    this.io = io
    this.initialize()
  }

  private initialize() {
    this.io.on('connection', (socket: Socket) => {
      Logger.info('User connected')

      socket.on('join', ({ userName }) => {
        Logger.info(`User ${userName} joined`)
        socket.join(userName)
      })

      socket.on('send_message', message => {
        Logger.info(
          `Message from ${message.sender} to ${message.receiver}: ${message.text}`
        )
        this.io.emit('response', message)
      })

      socket.on('leave', ({ userName }) => {
        Logger.info(`User ${userName} left`)
        socket.leave(userName)
      })

      socket.on('disconnect', () => {
        Logger.info('User disconnected')
      })
    })
  }
}
