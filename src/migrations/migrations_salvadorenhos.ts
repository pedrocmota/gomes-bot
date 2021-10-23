import {Knex} from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('salvadorenhos', (table) => {
    table.increments('id').notNullable().primary()
    table.string('product').notNullable()
    table.string('salvadorenho').notNullable()
    table.string('salvadorenhoUsername').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('salvadorenhos')
}