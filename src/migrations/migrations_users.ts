import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').notNullable().primary()
    table.string('username').notNullable()
    table.integer('admin').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}