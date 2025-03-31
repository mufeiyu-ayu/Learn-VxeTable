import type { JSX } from 'vue/jsx-runtime'
import type { VxeColumnProps, VxeTableInstance, VxeTableProps } from 'vxe-table'
import type { Render } from './types'

export interface CustomVxeColumnProps extends Omit<VxeColumnProps, 'slots'> {
  render?: (params: {
    row: unknown
    column: CustomVxeColumnProps
    $index: number
  }) => JSX.Element | string | number
}

export interface TableProps<T = unknown> {
  tableConfig?: VxeTableProps
  tableColumns: (VxeColumnProps & {
    render?: Render<T>
  })[]
  /*   请求 */
  getTableData: (params: unknown) => Promise<unknown>
  /*  查询条件 */
  queryContion?: Record<string, unknown>
  /**  是否显示操作列 */
  showOperation?: boolean
  operationConfig?: {
    coumnConfig?: VxeColumnProps
    render?: Render<T>
    /**   是否显示删除 */
    hideDelete?: boolean
    /**  删除操作 */
    deletHandle?: (params: unknown) => void
    deleteParams?: string
  }
  hideCheckbox?: boolean
  hideSeq?: boolean
}

export interface TableExposeInstance {
  tableRef: VxeTableInstance
  handleGetData: () => Promise<void>
  // 可以继续添加其他要暴露的方法
  // getSelectedRows?: () => any[]
}
