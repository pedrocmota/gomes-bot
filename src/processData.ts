import cheerio from 'cheerio'

export const processG2G = (html: string) => {
  const $ = cheerio.load(html)
  const processedData = {
    product: 'Desconhecido',
    price: '0',
    game: 'Desconhecido',
    type: 'Desconhecido'
  }
  try {
    $('br').each((i, element) => {
      const cheerioElement = $(element)
      if (i === 13) {
        var itemRaw = String(cheerioElement[0].prev['data'] as string)
        processedData.product = itemRaw

        if (itemRaw.startsWith('New World')) {
          processedData.game = 'New World'
        }
        if (itemRaw.startsWith('Aion Classic')) {
          processedData.game = 'Aion Classic'
        }
        if (itemRaw.startsWith('FRESH LEVEL')) {
          processedData.game = 'WOW CLASSIC'
          processedData.type = 'Venda de conta'
        }

        if (itemRaw.endsWith('(K Coins)')) {
          processedData.type = 'Venda de gold'
        }
        if (itemRaw.endsWith('(Mil Kinah)')) {
          processedData.type = 'Venda de Kinah'
        }
      }
      if (i === 15) {
        const valueRaw = cheerioElement[0].prev['data']
        processedData.price = valueRaw.substring(valueRaw.indexOf('$') + 1)
      }
    })
  } catch (error) {
    console.error(error)
    processedData.product = 'ERRO INTERNO'
    processedData.price = 'ERRO INTERNO'
    processedData.game = 'ERRO INTERNO'
    processedData.type = 'ERRO INTERNO'
  }
  return processedData
}

export const processPA = (html: string) => {
  const $ = cheerio.load(html)
  const processedData = {
    product: 'Desconhecido',
    game: 'Desconhecido',
    type: 'Desconhecido'
  }
  try {
    $('br').each((i, element) => {
      const cheerioElement = $(element)
      if (i === 3) {
        var itemRaw = String(cheerioElement[0].prev['data'] as string).substring(12)
        var type = String(cheerioElement[0].next['data'] as string).substring(18)
        processedData.product = itemRaw
        processedData.type = type
        if (itemRaw.startsWith('New World')) {
          processedData.game = 'New World'
        }
        if (itemRaw.startsWith('Aion Classic')) {
          processedData.game = 'Aion Classic'
        }
      }
    })
  } catch (error) {
    console.error(error)
    processedData.product = 'ERRO INTERNO'
    processedData.game = 'ERRO INTERNO'
    processedData.type = 'ERRO INTERNO'
  }
  return processedData
}