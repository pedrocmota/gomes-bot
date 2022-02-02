import knex from '../knexfile'
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

export const insertProduct = async (product: string, users: string[], site: sites) => {
  return knex<IProductTable>('products').insert({
    product: product,
    site: site,
    users: JSON.stringify(users)
  })
}

export const deleteProduct = async (product: string, site: sites) => {
  return knex<IProductTable>('products').delete().where({
    product: product,
    site: site
  })
}