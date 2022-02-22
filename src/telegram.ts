import {env, version, bot, isDev} from './index'
import dedent from 'dedent'
import {getOrder, setOrderUsers} from './queries/orders'
import {getUser} from './queries/users'
import {getOrderByOrderID} from './queries/orders'
import {generateMessage, generateKeyboard} from './messages'
import {
  testG2G,
  testPA,
  testP2PAH,
  testG2GCancel,
  testG2GConfirmation
} from './test'

export const useTelegram = () => {

  bot.command('help', async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      ctx.reply(dedent(`
      /version - Mostra a versão atual
      /username - Mostra o seu username
      /reset [id] - Reseta o keyboard da order
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

      if (args[0] === 'g2g-cancel') {
        if (typeof args[1] != 'string') {
          return ctx.reply('Sintaxe incorreta')
        }
        ctx.reply('Enviado teste de cancelamento do G2G.com')
        return testG2GCancel(args[1])
      }

      if (args[0] === 'g2g-confirmation') {
        if (typeof args[1] != 'string') {
          return ctx.reply('Sintaxe incorreta')
        }
        ctx.reply('Enviado teste de confirmação do G2G.com')
        return testG2GConfirmation(args[1])
      }

      return ctx.reply(dedent(`
      /test g2g [product]
      /test pa [product]
      /test p2pah [product]

      /test g2g-cancel [orderID]

      /test g2g-confirmation [orderID]
      `))
    }
  })

  bot.command('order', async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      const args = ctx.state.command.args
      if (args[0] === 'reset') {
        if (typeof args[1] === 'string') {
          const order = await getOrderByOrderID(args[1])
          if (order) {
            const chatID = !isDev ? env.TELEGRAM_CHAT_ID : env.TELEGRAM_TEST_CHAT_ID
            const keyboard = await generateKeyboard([]) as unknown as any[]
            await setOrderUsers(order.id, [])
            await bot.telegram.editMessageText(chatID, order.id, undefined, generateMessage({
              orderID: order.orderID,
              product: order.product,
              price: order.price || '00.00',
              game: order.game,
              type: order.type,
              users: [],
              status: order.status
            }, order.site), {
              disable_web_page_preview: true,
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: keyboard
              }
            })
            return ctx.reply('Operação concluída')
          } else {
            return ctx.reply('Essa order não existe')
          }
        } else {
          return ctx.reply('ID order inválido')
        }
      }
      return ctx.reply('Operação desconhecida')
    }
  })

  bot.on('callback_query', async (ctx) => {
    const chatID = ctx.callbackQuery.message!.chat.id.toString()
    const msgID = ctx.update.callback_query.message!.message_id
    if (chatID === env.TELEGRAM_CHAT_ID || chatID === env.TELEGRAM_TEST_CHAT_ID) {
      const order = await getOrder(msgID)
      if (order) {
        const actionUsername = `@${ctx.callbackQuery.from.username}`
        const actionUser = await getUser(actionUsername)
        const isAdmin = actionUser?.admin === 1
        const taggedUsers = JSON.parse(order.users as any) as string[]
        if (taggedUsers.includes(actionUsername) || isAdmin || taggedUsers.length === 0) {
          await setOrderUsers(msgID, [(ctx.update.callback_query as any).data])
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
            status: order.status
          }, order.site), {
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