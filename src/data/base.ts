import { BaseDTO } from '../dtos'
import { BaseFetch } from './axios'

export interface TableViwer<T extends BaseDTO> {
  findOne(id: number): Promise<T>
  find(): Promise<T[]>
  delete(id: number): Promise<boolean>
}
export interface API<T extends BaseDTO>
  extends TableViwer<T>,
    FormMutation<T> {}

export interface FormMutation<T extends BaseDTO> {
  save(obj: Partial<T>): Promise<boolean>
  update(obj: Partial<T>): Promise<boolean>
}

export interface DataPage<T extends BaseDTO> {
  data: T[]
  count: number
}
export interface APIPaged<T extends BaseDTO> extends API<T> {}

export interface DataProvider<T> {
  getData(): Promise<T[]>
}
export class APIConsumer<T extends BaseDTO>
  extends BaseFetch
  implements APIPaged<T>
{
  async findOne(id: number): Promise<T> {
    const request = await this.axios.get('/' + id)
    if (request.status === 200) {
      return request.data as T
    }

    throw Error('Error to try get resource')
  }

  async find(): Promise<T[]> {
    try {
      const data = await this.findByNext([], '')
      return data as T[]
    } catch (error) {
      return []
    }
  }
  private async findByNext(data: T[], next: string): Promise<T[]> {
    const request = await this.axios.get('/' + next)

    let nextUrl = request.data.next as string

    data.push(...request.data.results)
    if (nextUrl !== null && nextUrl.includes('/?')) {
      nextUrl = nextUrl.split('/?')[1]

      await this.findByNext(data, '?' + nextUrl)
    }
    return data
  }

 

  async save(data: Partial<T>): Promise<boolean> {
    const status = (await this.axios.post('/', data)).status

    return status === 201
  }

  async update(data: Partial<T>): Promise<boolean> {
    const status = (await this.axios.put('/' + data.id + '/', data)).status

    return status === 201 || status === 204
  }

  async delete(id: number): Promise<boolean> {
    const status = (await this.axios.delete('/' + id)).status

    return status === 200
  }
}
