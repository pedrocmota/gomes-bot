import {env, version, bot} from './index'
import dedent from 'dedent'
import {
  getProducts,
  getProduct,
  getProductByLabel,
  insertProduct,
  updateProduct,
  deleteProduct
} from './query'
import {testG2G, testPA} from './test'

interface IG2G {
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  salvadorenho: string,
  salvadorenhoID: string
}

interface IPA {
  orderID: string,
  product: string,
  game: string,
  salvadorenho: string,
  salvadorenhoID: string
}

export const sendG2GSold = (data: IG2G) => {
  bot.telegram.sendMessage(env.TELEGRAM_CHAT_ID, dedent(`
  VENDA NO G2G.COM

  Order ID: ${data.orderID}
  Produto: ${data.product}
  Valor: US$ ${data.price}
  Jogo: ${data.game}
  Tipo: ${data.type}
  Salvadorenho: ${data.salvadorenho} ${data.salvadorenhoID}
  `))
}

export const sendPASold = (data: IPA) => {
  bot.telegram.sendMessage(env.TELEGRAM_CHAT_ID, dedent(`
  VENDA NO PLAYERAUCTIONS.com

  Order ID: ${data.orderID}
  Produto: ${data.product}
  Jogo: ${data.game}
  Salvadorenho: ${data.salvadorenho} ${data.salvadorenhoID}
  `))
}

export const runCommands = () => {

  bot.command('help', async (ctx) => {
    ctx.reply(dedent(`
    /version - Mostra a versão atual
    /product - Gerenciador de produto. Consule /product help
    `))
  })

  bot.command('version', async (ctx) => {
    ctx.reply(dedent(`
    Gomes Bot v${version}
    `))
  })

  bot.command('username', async (ctx) => {
    const username = ctx.message.from.username
    if (typeof username === 'string' && username?.length > 0) {
      ctx.reply(`Seu username é @${username}`)
    } else {
      ctx.reply('Você não tem username')
    }
  })

  bot.command('product', async (ctx) => {
    const args = ctx.state.command.args
    if (args[0] === 'list') {
      const products = await getProducts()
      var text = ''
      products.forEach((el) => {
        text += '\n' + dedent(`
        ${el.id})

        ${el.product}
        ${el.user} ${el.username}

        ######################################
        `)
      })
      return ctx.reply(text)
    }

    if (args[0] === 'add') {
      if (typeof args[1] != 'string' || typeof args[2] != 'string' || typeof args[3] != 'string') {
        return ctx.reply('Sintaxe incorreta')
      }
      if ((await getProductByLabel(args[1])) !== undefined) {
        return ctx.reply('Esse produto já existe')
      }
      if (!args[3].startsWith('@')) {
        return ctx.reply('É necessário digitar um username válido')
      }
      return insertProduct(args[1], args[2], args[3]).then(() => {
        ctx.reply('Produto adicionado com sucesso')
      }).catch(() => {
        ctx.reply('Erro interno ao adicionar o produto')
      })
    }

    if (args[0] === 'edit') {
      if (typeof args[1] != 'string' || typeof args[2] != 'string' || typeof args[3] != 'string') {
        return ctx.reply('Sintaxe incorreta')
      }
      if ((await getProduct(args[1])) === undefined) {
        return ctx.reply('ID inexistente')
      }
      if (!args[3].startsWith('@')) {
        return ctx.reply('É necessário digitar um username válido')
      }
      return updateProduct(args[1], args[2], args[3], args[4]).then(() => {
        ctx.reply('Produto editado com sucesso')
      }).catch(() => {
        ctx.reply('Erro interno ao editar o produto')
      })
    }

    if (args[0] === 'delete') {
      if (typeof args[1] != 'string') {
        return ctx.reply('Sintaxe incorreta')
      }
      if ((await getProduct(args[1])) === undefined) {
        return ctx.reply('ID inexistente')
      }
      return deleteProduct(args[1]).then(() => {
        ctx.reply('Produto deletado com sucesso')
      }).catch(() => {
        ctx.reply('Erro interno ao deletar o produto')
      })
    }

    return ctx.reply(dedent(`
    /product list
    /product add [produto] [nome usuário] [username]
    /product edit [id] [produto] [nome usuário] [username]
    /product delete [id]
    `))
  })

  bot.command('test', async (ctx) => {
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

    return ctx.reply(dedent(`
    /test g2g [product]
    /test pa [product]
    `))
  })

  bot.on('text', (ctx) => ctx.reply('Comando desconhecido'))
}