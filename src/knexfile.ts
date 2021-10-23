import {Knex} from 'knex'
import path from 'path'
import dotenv from 'dotenv'

const knexConfig = () => {
  dotenv.config({path: path.resolve(__dirname, '../.env')})
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
    useNullAsDefault: true
  }
  return config
}

export default knexConfig()