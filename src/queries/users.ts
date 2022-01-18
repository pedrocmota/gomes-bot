import {knex} from '../index'
import {sites} from '../messages'

interface IUserTable {
  id: number,
  username: string,
  admin: number
}

export const getUser = async (username: string) => {
  return knex<IUserTable>('users').select<IUserTable>().where({username: username}).first()
}