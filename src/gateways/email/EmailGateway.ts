import { Config } from '../../config'
import { EmailJsData } from '../../interfaces'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

Config.loadConfig()

export class EmailGateway {
  public static async sendEmail({
    from,
    to,
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
        to,
        subject: 'Email from Website',
        text: `${text} 
      <<From - email: ${from} Name: ${nameSender}>>`,
      }
      await transporter.sendMail(email)
    } catch (e) {
      console.error('Error sending email:', e)
    }
  }
}
