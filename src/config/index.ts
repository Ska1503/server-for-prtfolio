import { config } from 'dotenv'

export class Config {
  public static loadConfig(): void {
    config()
  }

  public static getTelegramApiUrl(): string {
    return process.env.TELEGRAM_API_URL as string
  }

  public static getTelegramApiKey(): string {
    return process.env.TELEGRAM_API_KEY as string
  }

  public static getChatId(): string {
    return process.env.CHAT_ID as string
  }

  public static getEmailUser(): string {
    return process.env.EMAIL_USER as string
  }

  public static getEmailPass(): string {
    return process.env.EMAIL_PASS as string
  }

  public static getPort(): string | number {
    return process.env.PORT || '3000'
  }
}
