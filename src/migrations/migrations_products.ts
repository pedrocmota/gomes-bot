import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').notNullable().primary()
    table.string('product').notNullable()
    table.string('site').notNullable()
    table.string('users').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products')
}