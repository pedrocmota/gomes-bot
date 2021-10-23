import cheerio from 'cheerio'

export const processG2G = (html: string) => {
  const $ = cheerio.load(html)
  const processedData = {
    product: '',
    price: '0',
    game: 'Desconhecido',
    type: 'Desconhecido'
  }
  $('br').each((i, element) => {
    const cheerioElement = $(element)
    if (i === 13) {
      var itemRaw = String(cheerioElement[0].prev['data'] as string)
      processedData.product = itemRaw
      if (itemRaw.startsWith('New World')) {
        processedData.game = 'New World'
      }
      if (itemRaw.endsWith('(K Coins)')) {
        processedData.type = 'Venda de gold'
      }
    }
    if (i === 15) {
      const valueRaw = cheerioElement[0].prev['data']
      processedData.price = valueRaw.substring(valueRaw.indexOf('$') + 1)
    }
  })
  return processedData
}