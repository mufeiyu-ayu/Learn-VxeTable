import { http } from '@lynx-vben/request'

interface LoginParams {
  username: string
  password: string
}
interface LoginRes {
  userId: string
  userName: string
  roles: string[]

}
interface CardParams {
  current: number
  size: number
  gameType: number
}
interface CardRes {
  current: number
  size: number
  total: number
  records: string[]
}

export interface CatalogueItem {
  catalogueId: number
  catalogueName: string
  platformId: number
  platformName: string
  serverType: number
  order: number
  status: boolean
}
export const login = (data: LoginParams) => http.post<LoginRes>('/api/auth/login', data)

/**  卡密商品 */
export const getCardGoods = (params: CardParams) => http.get<CardRes>('/api/catalogue/list', params)

/**   删除卡密商品 */
export const deleteCardGoods = (id: number) => http.get<CardRes>(`/api/catalogue/delete/${id}`)
