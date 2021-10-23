import imaps from 'imap-simple'
import {simpleParser} from 'mailparser'
import chalk from 'chalk'
import {env} from './index'

type onEmailType = (from: string, subject: string, html: string) => void

export const imapG2G = (onEmail: onEmailType) => {
  const imapConfig = {
    imap: {
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      user: env.EMAIL_USER,
      password: env.EMAIL_PASSWORD,
      tls: true,
      authTimeout: 5000,
      tlsOptions: {
        rejectUnauthorized: false
      }
    }
  }

  try {
    imaps.connect(imapConfig).then((connection) => {
      connection.on('mail', () => {
        const searchCriteria = ['UNSEEN']
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT', ''],
          markSeen: true
        }

        connection.search(searchCriteria, fetchOptions).then((messages) => {
          messages.forEach((message) => {
            try {
              const id = message.attributes.uid
              const idHeader = 'Imap-Id: ' + id + '\r\n'
              const all = message.parts.find((el) => el.which == '')
              simpleParser(idHeader + all.body, (err, mail) => {
                const from = mail.from.value[0].address
                const subject = mail.subject
                const html = String(mail.html)
                onEmail(from, subject, html)
              })
            } catch (error) {
              console.log(
                chalk.red('Erro ao processar o e-mail')
              )
            }
          })
        })
      })

      console.log(
        chalk.green(`IMAP G2G.com conectado com sucesso! E-mail: ${env.EMAIL_USER}`)
      )

      return connection.openBox('INBOX')
    })
  } catch (error) {
    console.log(
      chalk.red('Erro ao conectar ao IMAP')
    )
    console.error(error)
  }
}