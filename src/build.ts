import fs from 'fs'
import path from 'path'

const obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))
obj.main = 'index.js'
obj.scripts = {
  'start': 'node index.js',
  'migrate:run': 'knex migrate:latest --knexfile knexfile.js',
  'migrate:back': 'knex migrate:rollback --knexfile knexfile.js'
}

fs.writeFileSync(path.resolve(__dirname, '../_build/package.json'), JSON.stringify(obj, null, 2))
fs.mkdirSync(path.resolve(__dirname, '../_build/logs'))
fs.copyFileSync(
  path.resolve(__dirname, '../ecosystem.config.js'),
  path.resolve(__dirname, '../_build/ecosystem.config.js')
)