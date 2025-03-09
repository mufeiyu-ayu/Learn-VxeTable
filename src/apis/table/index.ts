import type * as TableProps from './types'
import { http } from '../axios'

export function getProduct(data: TableProps.Paging) {
  return http.post<TableProps.OrderRecordList>('/api/table', data)
}

export * from './types'
