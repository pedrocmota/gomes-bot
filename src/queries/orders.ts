import knex from '../knexfile'
import {IOrderTable} from '../migrations/migrations_orders'
import {status} from '../messages'

export const insertOrder = async (data: IOrderTable) => {
  return knex<IOrderTable>('orders').insert({
    id: data.id,
    orderID: data.orderID,
    product: data.product,
    price: data.price,
    game: data.game,
    type: data.type,
    users: JSON.stringify(data.users) as any,
    status: data.status,
    site: data.site
  })
}

export const getOrder = async (id: number) => {
  return knex<IOrderTable>('orders').select<IOrderTable>().where({id: id}).first()
}

export const getOrderByOrderID = async (orderID: string) => {
  return knex<IOrderTable>('orders').select<IOrderTable>().where({orderID: orderID}).first()
}

export const setOrderUsers = async (id: number, users: string[]) => {
  return knex<IOrderTable>('orders').update({
    users: JSON.stringify(users) as any
  }).where({id: id})
}

export const setOrderStatus = async (id: number, status: status) => {
  return knex<IOrderTable>('orders').update({
    status: status
  }).where({id: id})
}

export const deleteOrder = async (id: number) => {
  return knex<IOrderTable>('orders').delete().where({id: id})
}