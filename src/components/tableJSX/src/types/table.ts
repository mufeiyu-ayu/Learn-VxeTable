import type { OrderRecord, OrderRecordList } from '@/apis'
import type { CommonResultType } from '@ayu-mu/model'
import type { JSX } from 'vue/jsx-runtime'
import type { VxeColumnProps } from 'vxe-table'

export interface CustomVxeColumnProps extends Omit<VxeColumnProps, 'slots'> {
  render?: (params: {
    row: OrderRecord
    column: CustomVxeColumnProps
    $index: number
  }) => JSX.Element | string | number
}
export interface TableProps<T = unknown> {
  tableConfig: {
    border?: boolean
    // 其他配置项
  }
  tableColumns: (VxeColumnProps & {
    render?: (params: {
      row: T
      column: CustomVxeColumnProps
      $index: number
    }) => JSX.Element | string | number
  })[]
  /*   请求 */
  getTableData: (params: unknown) => Promise<CommonResultType<OrderRecordList>>
  /*  查询条件 */
  queryContion: Record<string, unknown>
}
