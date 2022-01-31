import {Knex} from 'knex'
import dotenv from 'dotenv'
import path from 'path'

const knexConfig = () => {
  const isDev = process.env.npm_lifecycle_event === 'dev'
  dotenv.config({
    path: path.resolve(process.cwd(), path.resolve(process.cwd(), !isDev ? '../.env' : '.env'))
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

export default knexConfig()