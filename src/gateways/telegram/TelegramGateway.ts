import { Config } from '../../config'
import { HttpService } from '../../utils'
import { TelegramUpdateResponse } from '../../interfaces'

Config.loadConfig()

export class TelegramGateway {
  private static httpService: HttpService
  private static apiUrl: string
  static {
    TelegramGateway.apiUrl = Config.getTelegramApiUrl() || ''
    TelegramGateway.httpService = new HttpService(TelegramGateway.apiUrl)
  }

  public static async sendMessage(
    message: string
  ): Promise<TelegramUpdateResponse> {
    const apiUrl: string = `/bot${Config.getTelegramApiKey()}/sendMessage?chat_id=${Config.getChatId()}&text=${encodeURIComponent(
      message
    )}`

    const response = await this.httpService.post<TelegramUpdateResponse>(apiUrl)
    return response
  }

  public static async getUpdates(): Promise<TelegramUpdateResponse> {
    const apiUrl: string = `bot${Config.getTelegramApiKey()}/getUpdates`

    const response = await this.httpService.get<TelegramUpdateResponse>(apiUrl)
    return response
  }
}
