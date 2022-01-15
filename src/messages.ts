import dedent from 'dedent'
import {env, bot, isDev} from './index'

interface IG2G {
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  userName: string | undefined
}

interface IPA {
  orderID: string,
  product: string,
  game: string,
  userName: string | undefined
}

interface IP2PHA {
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  userName: string | undefined
}

export const sendG2GSold = (data: IG2G) => {
  const chatID = !isDev ? env.TELEGRAM_CHAT_ID : env.TELEGRAM_TEST_CHAT_ID
  bot.telegram.sendMessage(chatID, dedent(`
    <b>VENDA NO <a href="https://www.g2g.com/order/sellOrder/order?oid=${data.orderID}">G2G.COM</a></b>
    PARA: <b>${data.userName || 'Desconhecido'}</b>
 
    Order ID: ${data.orderID}
    Produto: ${data.product}
    Valor: US$ ${data.price}
    Jogo: ${data.game}
    Tipo: ${data.type}

    ${data.game === 'World of Warcraft' ? `
    Essa é uma venda do WOW, mande a mensagem abaixo no grupo do <a href="https://chat.whatsapp.com/GtVIzbU3tMyFs8898XInQN">WhatsApp</a>

    ID: ${data.orderID}
    DATA: ${new Date().toLocaleDateString('pt-BR')}
    PESSOA: COLOQUE SEU NOME AQUI
    `: ''}
    `), {
    disable_web_page_preview: true,
    parse_mode: 'HTML'
  })
}

export const sendPASold = (data: IPA) => {
  const chatID = !isDev ? env.TELEGRAM_CHAT_ID : env.TELEGRAM_TEST_CHAT_ID
  bot.telegram.sendMessage(chatID, dedent(`
    <b>VENDA NO PLAYERAUCTIONS.COM</b>
    PARA: <b>${data.userName || 'Desconhecido'}</b>

    Order ID: ${data.orderID}
    Produto: ${data.product}
    Jogo: ${data.game}
    `), {
    disable_web_page_preview: true,
    parse_mode: 'HTML'
  })
}

export const sendP2PHASold = (data: IP2PHA) => {
  const chatID = !isDev ? env.TELEGRAM_CHAT_ID : env.TELEGRAM_TEST_CHAT_ID
  bot.telegram.sendMessage(chatID, dedent(`
    <b>VENDA NO P2PAH.COM</b>
    PARA: <b>${data.userName || 'Desconhecido'}</b>
 
    Order ID: ${data.orderID}
    Produto: ${data.product}
    Valor: US$ ${data.price}
    Jogo: ${data.game}
    Tipo: ${data.type}

    ${data.game === 'World of Warcraft' ? `
    Essa é uma venda do WOW, não se esqueça de mandar a mensagem abaixo no grupo do <a href="https://chat.whatsapp.com/GtVIzbU3tMyFs8898XInQN">WhatsApp</a>

    ID: ${data.orderID}
    DATA: ${new Date().toLocaleDateString('pt-BR')}
    PESSOA: COLOQUE SEU NOME AQUI
    `: ''}
    `), {
    disable_web_page_preview: true,
    parse_mode: 'HTML'
  })
}