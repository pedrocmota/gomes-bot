import chalk from 'chalk'
import dedent from 'dedent'
import {loadEnv, loadVersion, loadBot, loadSMTP} from './loading'
import knex from './knexfile'
import {imap} from './imap'
import {processG2G, processPA, processP2PAH} from './processData'
import {getProduct} from './queries/product'
import {getOrderByOrderID, setOrderStatus} from './queries/orders'
import {useTelegram} from './telegram'
import {parserMiddleware} from './middleware'
import {sendOrder, changeOrderMessageStatus} from './messages'
import {registerHTML} from './logs'

export const isDev = process.env.npm_lifecycle_event === 'dev'
export const env = loadEnv()
export const version = loadVersion()
export const bot = loadBot()
export const smtp = loadSMTP()

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

  //G2G ORDER
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

  //PA ORDER
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

  //P2PAH ORDER
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

  //G2G CANCEL
  if (subject.startsWith('Your sell order') && subject.endsWith('has been cancelled.')) {
    const orderID = subject.substring(16).substring(0, 7)
    const order = await getOrderByOrderID(orderID)
    if (order) {
      order.users = JSON.parse(order.users as any)
      if (order.status === 'Ativo') {
        await changeOrderMessageStatus(order.id, order, 'Cancelado', 'G2G')
        await setOrderStatus(order.id, 'Cancelado')
      } else {
        console.error(`${orderID} não está ativa`)
      }
    } else {
      console.error(`${orderID} não existe`)
    }
  }

  //G2G CONFIRMED
  if (subject.startsWith('[G2G] Your service fee statement for sold order')) {
    const orderID = subject.substring(subject.indexOf('#') + 1)
    const order = await getOrderByOrderID(orderID)
    if (order) {
      order.users = JSON.parse(order.users as any)
      if (order.status === 'Ativo') {
        await changeOrderMessageStatus(order.id, order, 'Confirmado', 'G2G')
        await setOrderStatus(order.id, 'Confirmado')
      } else {
        console.error(`${orderID} não está ativa`)
      }
    } else {
      console.error(`${orderID} não existe`)
    }
  }
})