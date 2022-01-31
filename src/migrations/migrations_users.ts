import {Knex} from 'knex'

export interface IUserTable {
  id: number,
  username: string,
  user: string,
  admin: number
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').notNullable().primary()
        table.string('username').notNullable()
        table.string('user').notNullable()
        table.integer('admin').notNullable().defaultTo(0)
      })
    }
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}