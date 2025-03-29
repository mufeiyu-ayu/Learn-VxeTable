import type { TableProps } from '../types/table'
import { ElButton } from 'element-plus'
import { VxeColumn } from 'vxe-table'
/**
 * 渲染操作列
 */
export function renderOperationColumn(porps: TableProps) {
  console.log(porps, 'props')
  return (
    <VxeColumn
      field="operation"
      fixed="right"
      minWidth={200}
      title="操作"
      v-slots={{
        default: () => (
          <>
            <ElButton type="primary">编辑</ElButton>
            <ElButton type="danger">删除</ElButton>
          </>
        ),
      }}
    />
  )
}
