import type { OrderRecord, OrderRecordList } from '@/apis'
import type { CommonResultType } from '@ayu-mu/model'
import type { Ref } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type { VxeColumnProps, VxeTableInstance } from 'vxe-table'
import type { Render } from './types'

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
    render?: Render<T>
  })[]
  /*   请求 */
  getTableData: (params: unknown) => Promise<CommonResultType<OrderRecordList>>
  /*  查询条件 */
  queryContion?: Record<string, unknown>
  showOperation?: boolean
  operationConfig?: {
    delete: {
      type: 'primary' | 'danger'
      label: string
      visible: boolean
    }

  }
}

export interface TableExposeInstance {
  a: number
  tableRef: Ref<VxeTableInstance> | undefined
  /**   获取表格数据  */
  handleGetData: () => void
  // 可以继续添加其他要暴露的方法
  // getSelectedRows?: () => any[]
}
