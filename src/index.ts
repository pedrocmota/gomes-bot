import chalk from 'chalk'
import {loadEnv, loadDB, testConnection, loadBot} from './loading'
import {imapG2G} from './imap'
import {processG2G} from './processData'
import {getSalvadorenhosList} from './query'
import {sendG2GSold} from './telegram'

export const env = loadEnv()
export const knex = loadDB()
export const bot = loadBot()

testConnection()

imapG2G(async (from, subject, html) => {
  if (env.EMAILS_ACCEPTED.includes(from) && subject.startsWith('[G2G]')) {
    const orderID = subject.substring(subject.indexOf('#') + 1)
    const processedData = processG2G(html)

    const salvadorenhos = await getSalvadorenhosList()
    const salvadorenho = salvadorenhos.find((el) => el.product === processedData.product)

    sendG2GSold({
      orderID: orderID,
      product: processedData.product,
      price: processedData.price,
      game: processedData.game,
      type: processedData.type,
      salvadorenho: salvadorenho?.salvadorenho || 'Desconhecido',
      salvadorenhoID: salvadorenho?.salvadorenhoUsername || 'Desconhecido'
    })
  } else {
    console.log(
      chalk.yellowBright(`E-mail de fonte desconhecida: ${from}`)
    )
  }
})