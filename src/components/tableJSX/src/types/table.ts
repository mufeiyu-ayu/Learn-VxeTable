import type { OrderRecord, OrderRecordList } from '@/apis'
import type { CommonResultType } from '@ayu-mu/model'
import type { JSX } from 'vue/jsx-runtime'
import type { VxeColumnProps } from 'vxe-table'

export interface TableProps {
  tableConfig: {
    border?: boolean
    // 其他配置项
  }
  tableColumns: VxeColumnProps[]
  getTableData: (params: unknown) => Promise<CommonResultType<OrderRecordList>>
}

export interface CustomVxeColumnProps extends Omit<VxeColumnProps, 'slots'> {
  field: string
  render?: (params: {
    row: OrderRecord
    column: CustomVxeColumnProps
    $index: number
  }) => JSX.Element | string | number
}
