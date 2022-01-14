import imaps from 'imap-simple'
import {simpleParser} from 'mailparser'
import chalk from 'chalk'
import {env, isDev} from './index'

type onEmailType = (from: string, subject: string, html: string) => void

export const imap = (onEmail: onEmailType) => {
  const imapConfig = {
    imap: {
      host: !isDev ? env.EMAIL_HOST : env.TEST_EMAIL_HOST,
      port: !isDev ? env.EMAIL_PORT : env.TEST_EMAIL_PORT,
      user: !isDev ? env.EMAIL_USER : env.TEST_EMAIL_USER,
      password: !isDev ? env.EMAIL_PASSWORD : env.TEST_EMAIL_PASSWORD,
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
              console.error(chalk.red('Erro ao processar o e-mail'))
            }
          })
        })
      })

      console.info(chalk.green('Conexão IMAP aberta'))

      setTimeout(() => {
        console.info(chalk.green('Conexão IMAP fechada. Abrindo outra...'))
        connection.end()
        imap(onEmail)
      }, env.IMAP_TIMEOUT)

      return connection.openBox('INBOX')
    })
  } catch (error) {
    console.error(error)
  }
}