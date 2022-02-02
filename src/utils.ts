import randomstring from 'randomstring'

export const randomID = (length: number) => {
  return randomstring.generate({
    charset: 'numeric',
    length: length
  })
}

export const randomPrice = () => {
  return (Math.random() * (80 - 10) + 10).toFixed(2)
}