import { Request, Response } from 'express'
import { Logger } from '../utils'

export class ErrorHandler {
  public static handle(
    err: any,
    req: Request,
    res: Response,
  ): void {
    Logger.error(err)
    res
      .status(500)
      .json({ error: err.message || 'An unexpected error occurred' })
  }
}
