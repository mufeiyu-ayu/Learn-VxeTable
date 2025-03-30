import type { PropType } from 'vue'
import type { TableProps } from '../types/table'
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'
/**
 * 渲染操作列
 */
export const OperationColumn = defineComponent({
  name: 'OperationColumn',
  props: {
    config: {
      type: Object as PropType<TableProps['operationConfig']>,
      required: true,
    },
  },
  setup(props) {
    // 只会在组件初始化时执行一次
    console.log(props.config, 'props')

    return () => (
      <VxeColumn
        {...props.config?.coumnConfig}
        title={props.config?.coumnConfig?.title || '操作'}
        fixed={props.config?.coumnConfig?.fixed || 'right'}
        minWidth={props.config?.coumnConfig?.minWidth || 200}
        v-slots={{
          default: ({ row, rowIndex }) => (
            <div class="flex w-full justify-center items-center gap-2">
              {props.config?.render?.({ row, column: props.config, $index: rowIndex })}
              {!props.config?.hideDelete && <ElButton type="danger">删除</ElButton>}
            </div>
          ),
        }}
      />
    )
  },
})
