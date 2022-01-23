import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {cleanEnv, str, num} from 'envalid'
import knex from 'knex'
import knexfile from './knexfile'
import {Telegraf} from 'telegraf'
import nodemailer from 'nodemailer'
import {env, isDev} from './index'

export const loadEnv = () => {
  dotenv.config({path: path.resolve(process.cwd(), '.env')})
  return cleanEnv(process.env, {
    EMAIL_HOST: str(),
    EMAIL_PORT: num(),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),

    TEST_EMAIL_HOST: str(),
    TEST_EMAIL_PORT: num(),
    TEST_EMAIL_USER: str(),
    TEST_EMAIL_PASSWORD: str(),

    G2G_HOST: str(),
    PA_HOST: str(),
    P2PAH_HOST: str(),

    IMAP_TIMEOUT: num(),

    DB_IP: str(),
    DB_PORT: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),

    TELEGRAM_TOKEN: str(),
    TELEGRAM_TEST_TOKEN: str(),

    TELEGRAM_CHAT_ID: str(),
    TELEGRAM_TEST_CHAT_ID: str()
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
  return new Telegraf(!isDev ? env.TELEGRAM_TOKEN : env.TELEGRAM_TEST_TOKEN)
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