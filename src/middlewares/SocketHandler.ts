import { Server, Socket } from 'socket.io'
import { Logger } from '../utils'
import { User } from '../models'

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
        socket.join(userName)
      })

      socket.on('leave', ({ userName }) => {
        socket.leave(userName)
      })

      socket.on('typing', ({ userName, isTyping }) => {
        socket.to(userName).emit('typing', { userName, isTyping })
      })

      socket.on('send_message', async message => {
        const userId = message.receiver === 'admin' ? message.sender : message.receiver
          
        let user = await User.findOne({ userId })

        if (!user) {
          user = new User({ userId, messages: [message] })
        } else {
          user.messages.push(message)
        }
        await user.save()

        this.io.emit('response', message)
      })

      socket.on('disconnect', () => {
        Logger.info('User disconnected')
      })
    })
  }
}
