import {Knex} from 'knex'
import {IUserTable} from '../migrations/migrations_users'

export const seed = async (knex: Knex): Promise<void> => {
  await knex('users').del()
  await knex('users').insert<IUserTable>([
    {id: 1, username: '@Pedrocmota', user: 'Pedro', admin: 1},
    {id: 2, username: '@mateuscx', user: 'Mateus', admin: 0},
    {id: 3, username: '@fatalihue', user: 'Fataly', admin: 0},
    {id: 4, username: '@B_a_l_t', user: 'Balt', admin: 0},
    {id: 5, username: '@Lucasgpo', user: 'Lucas', admin: 0},
    {id: 6, username: '@qaPeppa', user: 'Rafael', admin: 0},
    {id: 7, username: '@GabrielSiv', user: 'Gabriel', admin: 0},
    {id: 8, username: '@diigomatsumoto', user: 'Matsumoto', admin: 0},
    {id: 9, username: '@fabioaguiar7', user: 'Fábio', admin: 0},
    {id: 10, username: '@Ugoorxd', user: 'Ugor', admin: 0},
    {id: 11, username: '@Shawkezz', user: 'Sixty', admin: 0}
  ])
}