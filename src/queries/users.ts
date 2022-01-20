import {knex} from '../index'
import {IUserTable} from '../migrations/migrations_users'

export const getUser = async (username: string) => {
  return knex<IUserTable>('users').select<IUserTable>().where({username: username}).first()
}

export const getAllUsers = async () => {
  return knex<IUserTable>('users').select<IUserTable[]>()
}