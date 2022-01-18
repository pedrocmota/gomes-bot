import dedent from 'dedent'
import {env, bot, isDev} from './index'
import {insertTempOrder} from './queries/tempOrders'

interface IOrder {
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  users: string[],
  status: status
}

export type sites = 'G2G' | 'PA' | 'P2PAH'
export type status = 'Ativo' | 'Solicitado para cancelar' | 'Cancelado' | 'Confirmado'

export const sendOrder = async (data: IOrder, site: sites) => {
  const messageText = generateMessage(data, site)
  const chatID = !isDev ? env.TELEGRAM_CHAT_ID : env.TELEGRAM_TEST_CHAT_ID
  const message = await bot.telegram.sendMessage(chatID, messageText, {
    disable_web_page_preview: true,
    parse_mode: 'HTML',
    ...((data.users.length > 1 && site === 'G2G') && {
      reply_markup: {
        inline_keyboard: [
          (() => {
            return data.users.map((user) => {
              return {
                text: user,
                callback_data: user
              }
            })
          })()
        ]
      }
    })
  })

  if (data.users.length > 1 && site === 'G2G') {
    await insertTempOrder({id: message.message_id, ...data, site: site, orderID: data.orderID})
  }
}

export const generateMessage = (data: IOrder, site: sites) => {
  if (site === 'G2G') {
    return G2GMessage(data)
  }
  if (site === 'PA') {
    return PAMessage(data)
  }
  if (site === 'P2PAH') {
    return P2PAHMessage(data)
  }
  return ''
}

export const G2GMessage = (data: IOrder) => {
  return dedent(`
  <b>VENDA NO <a href="https://www.g2g.com/order/sellOrder/order?oid=${data.orderID}">G2G.COM</a></b>
  PARA: <b>${generateUserMessage(data.users)}</b>
 
  Order ID: ${data.orderID}
  Produto: ${data.product}
  Valor: US$ ${data.price}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Status: ${data.status}
  `)
}

export const PAMessage = (data: IOrder) => {
  return dedent(`
  <b>VENDA NO PLAYERAUCTIONS.COM</b>
  PARA: <b>${generateUserMessage(data.users)}</b>

  Order ID: ${data.orderID}
  Produto: ${data.product}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Status: ${data.status}
  `)
}

export const P2PAHMessage = (data: IOrder) => {
  return dedent(`
  <b>VENDA NO P2PAH.COM</b>
  PARA: <b>${generateUserMessage(data.users)}</b>
 
  Order ID: ${data.orderID}
  Produto: ${data.product}
  Valor: US$ ${data.price}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Status: ${data.status}
  `)
}

export const generateUserMessage = (users: string[]) => {
  if (users.length === 0) {
    return 'Desconhecido'
  }
  let str = ''
  users.forEach((user, index) => {
    str += `${user}${index < (users.length - 1) ? ' ou ' : ''}`
  })
  return str
}