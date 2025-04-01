import type { PropType } from 'vue'
import type { TableProps } from '../types/table'
import { ElButton, ElPopconfirm } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'
import { useTableOperation } from '../hooks/table-operation-hooks'
/**
 * 渲染操作列
 */
export const OperationColumn = defineComponent({
  name: 'OperationColumn',
  props: {
    operationConfig: {
      type: Object as PropType<TableProps['operationConfig']>,
      required: true,
    },
    handleGetData: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { handleDelete } = useTableOperation({
      operationConfig: props.operationConfig,
      handleGetData: props.handleGetData as () => void,
    })

    return () => (
      <VxeColumn
        {...props.operationConfig?.coumnConfig}
        title={props.operationConfig?.coumnConfig?.title || '操作'}
        fixed={props.operationConfig?.coumnConfig?.fixed || 'right'}
        minWidth={props.operationConfig?.coumnConfig?.minWidth || 200}
        v-slots={{
          default: ({ row, rowIndex }) => (
            <div class="flex w-full justify-center items-center gap-2">
              {props.operationConfig?.render?.({ row, column: props.operationConfig?.coumnConfig, $index: rowIndex })}
              {!props.operationConfig?.hideDelete && (
                <ElPopconfirm
                  title="确定删除吗?"
                  onConfirm={() => handleDelete(row)}
                  v-slots={{
                    reference: () => <ElButton type="danger">删除</ElButton>,
                  }}
                >

                </ElPopconfirm>
              )}

            </div>
          ),
        }}
      />
    )
  },
})
