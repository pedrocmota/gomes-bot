import {env, version, bot} from './index'
import dedent from 'dedent'
import {getTempOrder, deleteTempOrder} from './queries/tempOrders'
import {getUser} from './queries/users'
import {generateMessage} from './messages'
import {testG2G, testPA, testP2PAH} from './test'

export const useTelegram = () => {

  bot.command('help', async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      ctx.reply(dedent(`
      /version - Mostra a versão atual
      /username - Mostra o seu username
      `))
    }
  })

  bot.command('version', async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      ctx.reply(dedent(`
      Gomes Bot v${version}
      `))
    }
  })

  bot.command('test', async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      const args = ctx.state.command.args
      if (args[0] === 'g2g') {
        if (typeof args[1] != 'string') {
          return ctx.reply('Sintaxe incorreta')
        }
        ctx.reply('Enviado teste do G2G.com')
        return testG2G(args[1])
      }
      if (args[0] === 'pa') {
        if (typeof args[1] != 'string') {
          return ctx.reply('Sintaxe incorreta')
        }
        ctx.reply('Enviado teste do PLAYERAUCTIONS.com')
        return testPA(args[1])
      }
      if (args[0] === 'p2pah') {
        if (typeof args[1] != 'string') {
          return ctx.reply('Sintaxe incorreta')
        }
        ctx.reply('Enviado teste do P2PAH.COM')
        return testP2PAH(args[1])
      }

      return ctx.reply(dedent(`
      /test g2g [product]
      /test pa [product]
      /test p2pah [product]
      `))
    }
  })

  bot.on('callback_query', async (ctx) => {
    const chatID = ctx.callbackQuery.message!.chat.id.toString()
    const msgID = ctx.update.callback_query.message!.message_id
    if (chatID === env.TELEGRAM_CHAT_ID || chatID === env.TELEGRAM_TEST_CHAT_ID) {
      const order = await getTempOrder(msgID)
      if (order) {
        const actionUsername = `@${ctx.callbackQuery.from.username}`
        const actionUser = await getUser(actionUsername)
        const isAdmin = actionUser?.admin === 1
        const taggedUsers = JSON.parse(order.users as any) as string[]
        if (taggedUsers.includes(actionUsername) || isAdmin) {
          await deleteTempOrder(msgID)
          await bot.telegram.editMessageReplyMarkup(chatID, order.id, undefined, {
            inline_keyboard: []
          })
          await bot.telegram.editMessageText(chatID, order.id, undefined, generateMessage({
            orderID: order.orderID,
            product: order.product,
            price: order.price || '00.00',
            game: order.game,
            type: order.type,
            users: [(ctx.update.callback_query as any).data],
            status: 'Ativo'
          }, 'G2G'), {
            disable_web_page_preview: true,
            parse_mode: 'HTML'
          })
        }
      }
      return
    }
  })

  bot.on('text', (ctx) => {
    if (ctx.message.chat.type === 'private') {
      return ctx.reply('Comando desconhecido')
    }
  })
}