import { NextFunction } from 'express'
import { EmailGateway } from '../../gateways'
import { EmailJsData } from '../../interfaces'

export class EmailController {
  public static async sendEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.body
      await EmailGateway.sendEmail(email as unknown as EmailJsData)
      res.json()
    } catch (error) {
      next(error)
    }
  }
}
