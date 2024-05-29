import { Request, Response, NextFunction } from 'express'
import { TelegramGateway } from '../../gateways'

export class TelegramController {
  public static async sendMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { message } = req.body
      const response = await TelegramGateway.sendMessage(message)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  public static async getUpdates(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await TelegramGateway.getUpdates()
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
