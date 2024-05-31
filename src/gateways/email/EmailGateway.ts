import { Config } from '../../config'
import { EmailJsData } from '../../interfaces'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { Logger } from '../../utils'

Config.loadConfig()

export class EmailGateway {
  public static async sendEmail({
    from,
    text,
    nameSender,
  }: EmailJsData): Promise<void> {
    try {
      const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
        nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: Config.getEmailUser(),
            pass: Config.getEmailPass(),
          },
        })

      const email: EmailJsData = {
        from,
        to: Config.getEmailUser(),
        subject: 'Email from Website',
        text: `${text} 
      <<From - email: ${from} Name: ${nameSender}>>`,
      }
      await transporter.sendMail(email)
    } catch (e) {
      Logger.error(`Error sending email: ${e}`)
    }
  }
}
