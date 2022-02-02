import knex from '../knexfile'
import {IUserTable} from '../migrations/migrations_users'

export const getUser = async (username: string) => {
  return knex<IUserTable>('users').select<IUserTable>().where({username: username}).first()
}

export const getAllUsers = async () => {
  return knex<IUserTable>('users').select<IUserTable[]>()
}

export const insertUser = async (username: string, name: string, isAdmin: boolean) => {
  return knex<IUserTable>('users').insert({
    username: username,
    user: name,
    admin: Number(isAdmin)
  })
}

export const deleteUser = async (username: string) => {
  return knex<IUserTable>('users').delete().where({
    username: username
  })
}