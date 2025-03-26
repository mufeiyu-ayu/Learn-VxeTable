export interface Paging {
  page: number
  pageSize: number

}

export interface OrderRecord {
  id: number
  parentId: number
  userId: number
  product_name: string
  product_code: string
  meno: string
  username: string
  user_code: string
  createTime: string // ISO 格式的日期字符串
  addTime: string // ISO 格式的日期字符串
  order_id: string
  order_name: string
  package_num: number
  weight: number // 浮点数，保留一位小数
  total_weight: number // 浮点数，保留一位小数
}

export interface OrderRecordList extends Paging {
  total: number
  list: OrderRecord[]

}
