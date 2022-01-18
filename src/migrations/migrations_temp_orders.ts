import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('temp_orders', (table) => {
    table.integer('id').notNullable().primary()
    table.string('orderID').notNullable()
    table.string('product').notNullable()
    table.string('price').notNullable()
    table.string('game').notNullable()
    table.string('type').notNullable()
    table.string('users').notNullable()
    table.string('site').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('temp_orders')
}