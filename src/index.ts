import chalk from 'chalk'
import dedent from 'dedent'
import {loadEnv, loadDB, loadVersion, loadBot, loadSMTP} from './loading'
import {imap} from './imap'
import {processG2G, processPA, processP2PAH} from './processData'
import {getProduct} from './queries/product'
import {useTelegram} from './telegram'
import {parserMiddleware} from './middleware'
import {sendOrder} from './messages'
import {registerHTML} from './logs'

export const env = loadEnv()
export const version = loadVersion()
export const knex = loadDB()
export const bot = loadBot()
export const smtp = loadSMTP()
export const isDev = process.env.npm_lifecycle_event === 'dev'

console.info(chalk.green(`Gomes bot v${version}`))

if (isDev) {
  console.info(chalk.yellow('Gomes bot está em modo de desenvolvimento'))
}

knex.raw('SELECT version() as version').then((data) => {
  const version = data[0][0].version
  console.info(chalk.greenBright(dedent`
    Banco de dados conectado! Versão: ${version}
  `))
}).catch((error) => {
  console.error(chalk.red(dedent`
    Erro ao conectar com o banco de dados: ${error.sqlMessage || 'Banco offline'}
  `))
  process.exit(1)
})

bot.use(parserMiddleware)
useTelegram()
bot.launch()

imap(async (from, subject, html) => {
  registerHTML(html)
  console.info(`E-mail recebido de ${from} `)

  //G2G
  if (subject.startsWith('[G2G] New Sell Order')) {
    const orderID = subject.substring(subject.indexOf('#') + 1)
    const processedData = processG2G(html)

    const product = await getProduct(processedData.product, 'G2G')
    const users = product ? JSON.parse(product.users) : []

    sendOrder({
      orderID: orderID,
      product: processedData.product,
      price: processedData.price,
      game: processedData.game,
      type: processedData.type,
      users: users,
      status: 'Ativo'
    }, 'G2G')
  }

  //PA
  if (subject.includes('You Have a New Order')) {
    const orderID = subject.substring(32)
    const processedData = processPA(html)

    const product = await getProduct(processedData.product, 'PA')
    const users = product ? JSON.parse(product.users) : []

    sendOrder({
      orderID: orderID,
      product: processedData.product,
      price: '00.00',
      game: processedData.game,
      type: processedData.type,
      users: users,
      status: 'Ativo'
    }, 'PA')
  }

  //P2PAH
  if (subject.startsWith('[P2PAH] New Sell Order')) {
    const orderID = subject.substring(subject.indexOf('#') + 1)
    const processedData = processP2PAH(html)

    const product = await getProduct(processedData.product, 'P2PAH')
    const users = product ? JSON.parse(product.users) : []

    sendOrder({
      orderID: orderID,
      product: processedData.product,
      price: processedData.price,
      game: processedData.game,
      type: processedData.type,
      users: users,
      status: 'Ativo'
    }, 'P2PAH')
  }
})