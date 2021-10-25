import {env, bot} from './index'
import dedent from 'dedent'

interface IData {
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  salvadorenho: string,
  salvadorenhoID: string
}

export const sendG2GSold = (data: IData) => {
  bot.sendMessage(env.TELEGRAM_CHAT_ID, dedent(`
  VENDA NO G2G.COM

  Order ID: ${data.orderID}
  Produto: ${data.product}
  Valor: US$ ${data.price}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Salvadorenho: ${data.salvadorenho} @${data.salvadorenhoID}
  `))
}