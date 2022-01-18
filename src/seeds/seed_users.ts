import {Knex} from 'knex'

export const seed = async (knex: Knex): Promise<void> => {
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: '@Pedrocmota', admin: 1},
    {id: 2, username: '@mateuscx', admin: 0},
    {id: 3, username: '@fatalihue', admin: 0},
    {id: 4, username: '@B_a_l_t', admin: 0},
    {id: 5, username: '@Lucasgpo', admin: 0},
    {id: 6, username: '@qaPeppa', admin: 0},
    {id: 7, username: '@GabrielSiv', admin: 0},
    {id: 8, username: '@diigomatsumoto', admin: 0}
  ])
}