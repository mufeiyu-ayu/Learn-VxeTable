import type { PropType } from 'vue'

import type { VxeColumnProps } from 'vxe-table'
import type { CustomVxeColumnProps } from '../types/table.ts'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'

export const ColumnItem = defineComponent({
  name: 'ColumnItem',
  props: {
    column: {
      type: Object as PropType<CustomVxeColumnProps>,
      required: true,
    },
  },
  setup(props) {
    // 对于特殊类型的列（如 seq、checkbox 等），直接返回 VxeColumn
    if (props.column.type === 'seq' || props.column.type === 'checkbox') {
      return () => <VxeColumn {...props.column} key={props.column.type} />
    }

    // 对于普通列，保持原有的渲染逻辑
    return () => (
      <VxeColumn
        {...(props.column as VxeColumnProps)}
        key={props.column.field}

        v-slots={{
          default: ({ row, rowIndex }) =>
            props.column.render
              ? props.column.render({ row, column: props.column, $index: rowIndex })
              : row[props.column.field as string],
        }}
      />
    )
  },
})
