import {Context} from 'telegraf'

export const parserMiddleware = (ctx: Context, next) => {
  const message = ctx.message['text']
  if (typeof message === 'string') {
    try {
      const array = parser(message)
      const command = array[0] || ''
      const args = array.slice(1)
      ctx.state.command = {
        command: command,
        args: args
      }
    } catch { }
  }
  next()
}

const parser = (full: string) => {
  var array = []
  var str = ''
  var inaspass = false
  for (let index in full as any) {
    var letter = full[index]
    if (letter == '"') {
      if (inaspass) {
        inaspass = false
        if (str.length > 0 && str.length < 500) {
          array.push(str)
        }
        str = ''
      } else {
        inaspass = true
      }
      continue
    } else if (letter == ' ' && !inaspass) {
      if (str != '') {
        if (str.length > 0 && str.length < 500) {
          array.push(str)
        }
      }
      str = ''
      continue
    } else if (full.length - 1 == index as any) {
      str = str + letter
      if (str.length > 0 && str.length < 500) {
        array.push(str)
      }
      break
    }
    str = str + letter
  }
  return array
}