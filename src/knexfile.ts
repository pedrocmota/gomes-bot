import knex, {Knex} from 'knex'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

const knexConfig = () => {
  const envPath = path.resolve(process.cwd(), path.resolve(process.cwd(), '.env'))
  if (!fs.existsSync(envPath)) {
    console.info(chalk.red(`Env não encontrado em ${envPath}`))
  }
  dotenv.config({
    path: path.resolve(process.cwd(), path.resolve(process.cwd(), '.env'))
  })
  const config: Knex.Config = {
    client: 'mysql',
    connection: {
      host: process.env.DB_IP,
      user: process.env.DB_USER,
      port: parseInt(process.env.DB_PORT as string),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    },
    useNullAsDefault: true
  }
  return config
}

export default knex(knexConfig())