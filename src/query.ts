import {knex} from './index'

interface IUserTable {
  id: number,
  product: string,
  user: string,
  username: string
}

export const getProduct = (id: string) => {
  return (
    knex<IUserTable>('users').select<IUserTable>().where({id: parseInt(id)}).first()
  )
}

export const getProductByLabel = (label: string) => {
  return (
    knex<IUserTable>('users').select<IUserTable>().where({product: label}).first()
  )
}

export const getProducts = async () => {
  return (
    knex<IUserTable>('users').select<IUserTable[]>()
  )
}

export const insertProduct = async (product: string, user: string, userID: string) => {
  return knex<IUserTable>('users').insert({
    product: product,
    user: user,
    username: userID
  })
}

export const updateProduct = async (id: string, product: string, user: string, userID: string) => {
  return knex<IUserTable>('users').update({
    product: product,
    user: user,
    username: userID
  }).where({id: parseInt(id)})
}

export const deleteProduct = async (id: string) => {
  return knex<IUserTable>('users').delete().where({id: parseInt(id)})
}