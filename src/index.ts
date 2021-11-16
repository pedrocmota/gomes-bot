import chalk from 'chalk'
import {loadEnv, loadDB, testConnection, loadVersion, loadBot, loadSMTP} from './loading'
import {imap} from './imap'
import {processG2G, processPA} from './processData'
import {getProducts} from './query'
import {sendG2GSold, sendPASold, runCommands} from './telegram'
import {parserMiddleware} from './middleware'

export const env = loadEnv()
export const version = loadVersion()
export const knex = loadDB()
export const bot = loadBot()
export const smtp = loadSMTP()

console.log(
  chalk.green(`Gomes bot v${version}`)
)

testConnection()

bot.use(parserMiddleware)
runCommands()
bot.launch()

imap(async (from, subject, html) => {
  if (subject.includes('New Sell Order')) {
    const orderID = subject.substring(subject.indexOf('#') + 1)
    const processedData = processG2G(html)

    const products = await getProducts()
    const salvadorenho = products.find((el) => el.product === processedData.product)

    sendG2GSold({
      orderID: orderID,
      product: processedData.product,
      price: processedData.price,
      game: processedData.game,
      type: processedData.type,
      user: salvadorenho?.user || 'Desconhecido',
      userName: salvadorenho?.username || '@Desconhecido'
    })
  }

  if (subject.includes('You Have a New Order')) {
    const orderID = subject.substring(32)
    const processedData = processPA(html)

    const products = await getProducts()
    const salvadorenho = products.find((el) => el.product === processedData.product)

    sendPASold({
      orderID: orderID,
      product: processedData.product,
      game: processedData.game,
      user: salvadorenho?.user || 'Desconhecido',
      userName: salvadorenho?.username || '@Desconhecido'
    })
  }
})