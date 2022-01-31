import {Knex} from 'knex'
import {sites, status} from '../messages'

export interface IOrderTable {
  id: number,
  orderID: string,
  product: string,
  price: string,
  game: string,
  type: string,
  users: string[],
  status: status,
  site: sites
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('orders').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('orders', (table) => {
        table.integer('id').notNullable().primary()
        table.string('orderID').notNullable()
        table.string('product').notNullable()
        table.string('price').notNullable()
        table.string('game').notNullable()
        table.string('type').notNullable()
        table.string('users').notNullable()
        table.dateTime('datetime').notNullable().defaultTo(knex.fn.now())
        table.string('status').notNullable()
        table.string('site').notNullable()
      })
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders')
}