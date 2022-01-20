import {knex} from '../index'
import {sites} from '../messages'
import {IProductTable} from '../migrations/migrations_products'

export const getProduct = async (product: string, site?: sites) => {
  return (
    knex<IProductTable>('products').select<IProductTable[]>().where({
      product: product,
      ...((site) && {
        site: site
      })
    }).first()
  )
}

export const insertProduct = async (product: string, users: string, site: sites) => {
  return knex<IProductTable>('products').insert({
    product: product,
    site: site,
    users: users
  })
}