import chalk from 'chalk'
import {loadEnv, loadDB, testConnection, loadBot} from './loading'
import {imapG2G} from './imap'
import {processG2G} from './processData'
import {getSalvadorenhosList} from './query'
import {sendG2GSold} from './telegram'

export const env = loadEnv()
export const knex = loadDB()
export const bot = loadBot()

console.log(
  chalk.green(`►►► Iniciando o Truefarmers bot v${process.env.npm_package_version} ◄◄◄`)
)

testConnection()

imapG2G(async (from, subject, html) => {
  if (env.EMAILS_ACCEPTED.includes(from) && subject.includes('New Sell Order')) {
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
  }
})