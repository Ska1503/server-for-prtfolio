import { Message } from '../../interfaces'
import { User } from '../../models'
class ChatService {
  public getUserByEmail = async (email: string) => {
    let user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  public deleteUserByEmail = async (email: string) => {
    const user = await User.findOneAndDelete({ email })

    if (!user) {
      throw new Error('User not found')
    }
  }

  public getAllUsers = async () => {
    const users = await User.find()

    if (!users) {
      throw new Error('Users not found')
    }

    return users
  }

  public addUserMessage = async (email: string, message: Message) => {
    let user = await User.findOne({ email })

    if (!user) {
      user = new User({ email, messages: [message] })
    } else {
      user.messages.push(message)
    }
    await user.save()

    return message
  }
}

export default new ChatService()

// export class ChatService {
//   private io: Server

//   constructor(io: Server) {
//     this.io = io
//   }

//   public initialize() {
//     this.io.on('connection', (socket: Socket) => {
//       socket.on('join', async ({ nickname, roomId }) => {
//         const user = await User.findOne({ nickname, roomId })
//         if (!user) {
//           socket.emit('error', 'User not found')
//           return
//         }

//         socket.join(roomId)

//         socket.on('message', async msg => {
//           const message = new Message({ userId: user._id, text: msg })
//           await message.save()
//           user.messages.push({ text: message.text, createdAt: message.createdAt })
//           await user.save()

//           this.io.to(roomId).emit('message', {
//             text: msg,
//             user: user.nickname,
//             createdAt: Date.now(),
//           })
//         })
//       })
//     })
//   }
// }
