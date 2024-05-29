import { Request, Response, NextFunction } from 'express'
import { Logger } from '../utils'

export class ErrorHandler {
  public static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    Logger.error(err)
    res
      .status(500)
      .json({ error: err.message || 'An unexpected error occurred' })
  }
}
