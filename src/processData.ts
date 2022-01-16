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
        const processedProduct = processProduct(itemRaw.trim().toLowerCase())
        processedData.game = processedProduct.game
        processedData.type = processedProduct.type
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
        processedData.product = itemRaw.trim()
        const processedProduct = processProduct(itemRaw.trim().toLowerCase())
        processedData.game = processedProduct.game
        processedData.type = processedProduct.type
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

export const processP2PAH = (html: string) => {
  const processedData = {
    product: 'Desconhecido',
    price: '0',
    game: 'Desconhecido',
    type: 'Desconhecido'
  }
  const $ = cheerio.load(html)
  const ps = $('p > span')
  try {
    ps.each((i, el) => {
      const itemRaw = $(el).prev().text()
      const valueRaw = $(el).next().text()
      if (i === 23) {
        processedData.product = itemRaw
        const processedProduct = processProduct(itemRaw.trim().toLowerCase())
        processedData.game = processedProduct.game
        processedData.type = processedProduct.type
      }
      if (i === 26) {
        const value = valueRaw.substring(valueRaw.indexOf('$') + 1)
        processedData.price = value
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

const processProduct = (product: string) => {
  const data = {
    game: 'Desconhecido',
    type: 'Desconhecido'
  }

  if (product.includes('new world')) {
    data.game = 'New World'
  }
  if (product.includes('aion classic') || product.includes('aion')) {
    data.game = 'Aion Classic'
  }
  if (product.startsWith('world of warcraft') || product.startsWith('wow')) {
    data.game = 'World of Warcraft'
  }
  if (product.includes('level') || product.startsWith('mage')) {
    data.game = 'World of Warcraft'
  }

  if (product.includes('level') || product.includes('account') || product.includes('gears')) {
    data.type = 'Venda de conta'
  }
  if (product.endsWith('(k coins)') || product.endsWith('(gold)')) {
    data.type = 'Venda de gold'
  }
  if (product.endsWith('(mil kinah)') || product.endsWith('(M Kinah)')) {
    data.type = 'Venda de Kinah'
  }

  return data
}