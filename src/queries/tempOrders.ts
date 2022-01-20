import {knex} from '../index'
import {ITempTable} from '../migrations/migrations_temp_orders'

export const insertTempOrder = async (data: ITempTable) => {
  return knex<ITempTable>('temp_orders').insert({
    id: data.id,
    orderID: data.orderID,
    product: data.product,
    price: data.price,
    game: data.game,
    type: data.type,
    users: JSON.stringify(data.users) as any,
    site: data.site
  })
}

export const getTempOrder = async (id: number) => {
  return knex<ITempTable>('temp_orders').select<ITempTable>().where({id: id}).first()
}

export const deleteTempOrder = async (id: number) => {
  return knex<ITempTable>('temp_orders').delete().where({id: id})
}