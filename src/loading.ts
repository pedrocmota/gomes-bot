import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {cleanEnv, str, num} from 'envalid'
import chalk from 'chalk'
import dedent from 'dedent'
import knex from 'knex'
import knexfile from './knexfile'
import {Telegraf} from 'telegraf'
import nodemailer from 'nodemailer'
import {env, knex as connection} from './index'

export const loadEnv = () => {
  dotenv.config({path: path.resolve(process.cwd(), '.env')})
  return cleanEnv(process.env, {
    EMAIL_HOST: str(),
    EMAIL_PORT: num(),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),

    G2G_HOST: str(),
    PA_HOST: str(),

    DB_IP: str(),
    DB_PORT: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),

    TELEGRAM_TOKEN: str(),

    TELEGRAM_CHAT_ID: str()
  })
}

export const loadVersion = () => {
  const obj = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
  return obj.version || 'DESCONHECIDO'
}

export const loadDB = () => {
  return knex(knexfile)
}

export const loadBot = () => {
  return new Telegraf(env.TELEGRAM_TOKEN)
}

export const loadSMTP = () => {
  return nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD
    }
  })
}

export const testConnection = () => {
  connection.raw('SELECT version() as version').then((data) => {
    const version = data[0][0].version
    console.info(chalk.greenBright(dedent`
      Banco de dados conectado! Versão: ${version}
    `))
  }).catch((error) => {
    console.error(chalk.red(dedent`
      Erro ao conectar com o banco de dados: ${error.sqlMessage || 'Banco offline'}
    `))
    process.exit(1)
  })
}