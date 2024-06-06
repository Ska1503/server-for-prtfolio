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

      socket.on('join', ({ email }) => {
        Logger.info(`User ${email} joined`)
        socket.join(email)
      })

      socket.on('send_message', message => {
        Logger.info(
          `Message from ${message.sender} to ${message.receiver}: ${message.content}`
        )
        this.io.to(message.receiver).emit('receive_message', message)
      })

      socket.on('disconnect', () => {
        Logger.info('User disconnected')
      })
    })
  }
}
