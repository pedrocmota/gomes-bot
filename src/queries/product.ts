import {knex} from '../index'
import {sites} from '../messages'

interface IProductTable {
  id: number,
  product: string,
  site: string,
  users: string
}

export const getProduct = async (product: string) => {
  return (
    knex<IProductTable>('products').select<IProductTable[]>().where({product: product}).first()
  )
}

export const insertProduct = async (product: string, users: string, site: sites) => {
  return knex<IProductTable>('products').insert({
    product: product,
    site: site,
    users: users
  })
}