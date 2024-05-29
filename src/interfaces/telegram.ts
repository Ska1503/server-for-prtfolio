export interface TelegramUpdateResponse {
  ok: boolean
  result: TelegramUpdate[]
}

interface TelegramUpdate {
  update_id: number
  message: TelegramMessage
}

interface TelegramMessage {
  message_id: number
  from: TelegramUser
  chat: TelegramChat
  date: number
  text: string
}

interface TelegramUser {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  language_code: string
}

interface TelegramChat {
  id: number
  first_name: string
  username: string
  type: string
}
