import { Server, Socket } from 'socket.io'
import { User, Message } from '../../models'

export class ChatService {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  public initialize() {
    this.io.on('connection', (socket: Socket) => {
      socket.on('join', async ({ nickname, roomId }) => {
        const user = await User.findOne({ nickname, roomId })
        if (!user) {
          socket.emit('error', 'User not found')
          return
        }

        socket.join(roomId)

        socket.on('message', async msg => {
          const message = new Message({ userId: user._id, text: msg })
          await message.save()
          user.messages.push({ text: message.text, createdAt: message.createdAt })
          await user.save()

          this.io.to(roomId).emit('message', {
            text: msg,
            user: user.nickname,
            createdAt: Date.now(),
          })
        })
      })
    })
  }
}
