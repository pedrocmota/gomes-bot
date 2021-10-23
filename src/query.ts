import {knex} from './index'

interface ISalvadorenhoTable {
  id: number,
  product: string,
  salvadorenho: string,
  salvadorenhoUsername: string
}

export const getSalvadorenhosList = async () => {
  return (
    knex<ISalvadorenhoTable>('salvadorenhos').select<ISalvadorenhoTable[]>()
  )
}