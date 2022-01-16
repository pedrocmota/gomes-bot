import randomstring from 'randomstring'
import {format} from 'date-fns'
import path from 'path'
import fs from 'fs'

export const registerHTML = (html: string) => {
  const datetime = `${format(new Date(), 'dd-MM-yyyy HH-mm-ss')} - ${randomstring.generate({length: 5})}`
  const file = path.resolve(process.cwd(), `./logs/${datetime}.txt`)
  fs.writeFileSync(file, html)
}