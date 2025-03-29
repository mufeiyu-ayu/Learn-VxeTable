import type { VxeColumnProps } from 'vxe-table'

import type { CustomVxeColumnProps } from '../types/table.ts'
import { VxeColumn } from 'vxe-table'

export function renderColumn(column: CustomVxeColumnProps) {
  // 对于特殊类型的列（如 seq、checkbox 等），直接返回 VxeColumn
  if (column.type === 'seq' || column.type === 'checkbox') {
    return <VxeColumn {...column} key={column.type} />
  }

  // 对于普通列，保持原有的渲染逻辑
  return (
    <VxeColumn
      {...(column as VxeColumnProps)}
      key={column.field}
      v-slots={{
        default: ({ row, rowIndex }) => {
          if (column.render) {
            return column.render({ row, column, $index: rowIndex })
          }
          return row[column.field as string]
        },
      }}
    />
  )
}
