import {env, version, bot} from './index'
import dedent from 'dedent'
import {testMail} from './test'

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
  bot.telegram.sendMessage(env.TELEGRAM_CHAT_ID, dedent(`
  VENDA NO G2G.COM

  Order ID: ${data.orderID}
  Produto: ${data.product}
  Valor: US$ ${data.price}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Salvadorenho: ${data.salvadorenho} @${data.salvadorenhoID}
  `))
}

export const TelegramStatus = () => {
  bot.command('status', (ctx) => {
    if (String(ctx.message.chat.id) === env.TELEGRAM_CHAT_ID) {
      ctx.telegram.sendMessage(ctx.message.chat.id,
        `[BOT] Funcionando. v${version}`
      )
    }
  })
}

export const TelegramTest = () => {
  bot.command('teste', (ctx) => {
    if (String(ctx.message.chat.id) === env.TELEGRAM_CHAT_ID) {
      testMail()
      ctx.telegram.sendMessage(ctx.message.chat.id,
        '[BOT] Enviando teste'
      )
    }
  })
}