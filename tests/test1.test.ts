import {Chance} from 'chance'
import knex from '../src/knexfile'
import {getUser, insertUser, deleteUser} from '../src/queries/users'
import {getProduct, insertProduct, deleteProduct} from '../src/queries/product'
import {IUserTable} from '../src/migrations/migrations_users'
import {IProductTable} from '../src/migrations/migrations_products'

it('Testando conexão com banco de dados', () => {
  knex.raw('SELECT version() as version').then((data) => {
    const version = data[0][0].version
    console.log(version)
  }).catch(() => {
    process.exit(1)
  })
  expect(true).toBe(true)
})

describe('Testando consulta de usuários', () => {
  const name1 = new Chance().last()
  const name2 = new Chance().last()

  describe('Adicionando usuários', () => {
    it('Adicionando usuário 1', async () => {
      expect(
        Array.isArray(await insertUser(`@${name1}`, name1, false))
      ).toBe(true)
    })

    it('Adicionando usuário 2', async () => {
      expect(
        Array.isArray(await insertUser(`@${name2}`, name2, false))
      ).toBe(true)
    })
  })

  describe('Lendo usuários', () => {
    it('Lendo usuário 1', async () => {
      expect(await getUser(`@${name1}`)).toMatchObject<Omit<IUserTable, 'id'>>({
        username: `@${name1}`,
        user: name1,
        admin: 0
      })
    })

    it('Lendo usuário 2', async () => {
      expect(await getUser(`@${name2}`)).toMatchObject<Omit<IUserTable, 'id'>>({
        username: `@${name2}`,
        user: name2,
        admin: 0
      })
    })
  })

  describe('Removendo usuários', () => {
    it('Removendo usuário 1', async () => {
      expect(await deleteUser(`@${name1}`)).toBe(1)
    })

    it('Removendo usuário 2', async () => {
      expect(await deleteUser(`@${name2}`)).toBe(1)
    })
  })
})

describe('Testando consulta de produtos', () => {
  const product = 'Aion Classic > Siel-Teste (M Kinah)'
  const username = ['@Pedrocmota']
  const site = 'G2G'

  it('Adicionando produto ', async () => {
    expect(
      Array.isArray(await insertProduct(product, username, site))
    ).toBe(true)
  })

  it('Lendo produto ', async () => {
    expect(await getProduct(product, site)).toMatchObject<Omit<IProductTable, 'id'>>({
      product: product,
      site: site,
      users: JSON.stringify(username)
    })
  })

  it('Removendo produto ', async () => {
    expect(await deleteProduct(product, site)).toBe(1)
  })
})