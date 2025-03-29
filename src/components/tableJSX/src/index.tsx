import type { PropType, Ref } from 'vue'
import type { VxeTableInstance } from 'vxe-table'
import type { CustomVxeColumnProps, TableProps } from './types/table.ts'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeTable } from 'vxe-table'
import { OperationColumn } from './components/table-operation'
import { ColumnItem } from './components/table.column'
import { setupTable } from './hooks/table-hooks.ts'
// 定义要暴露的方法和属性的类型
export interface TableExposeInstance {
  a: number
  tableRef: Ref<VxeTableInstance> | undefined
  // 可以继续添加其他要暴露的方法
  // getSelectedRows?: () => any[]
}
export default defineComponent({
  name: 'DataGrid',
  props: {
    tableConfig: {
      type: Object as PropType<TableProps['tableConfig']>,
      required: true,
    },
    tableColumns: {
      type: Array as PropType<TableProps['tableColumns']>,
      required: true,
    },
    getTableData: {
      type: Function as PropType<TableProps['getTableData']>,
      required: true,
    },
    showOperation: {
      type: Boolean as PropType<TableProps['showOperation']>,
      default: true,
      required: true,
    },
    operationConfig: {
      type: Object as PropType<TableProps['operationConfig']>,
      default: () => ({
        delete: {
          type: 'danger',
          label: '删除',
        },
      }),
    },
  },
  setup(props: TableProps, { expose }) {
    const {
      tableConfig,
      total,
      tableData,
      defaultPageSize,
      tableColumns: columns,
      tableRef,
      currentPage,
      handleSelectionChange,
      showOperation,
    } = setupTable()

    expose({
      a: 1,
      tableRef,
    } as TableExposeInstance)

    return () => (
      <div class="w-[80%] h-full flex-1 flex flex-col justify-between">
        <div class="flex-1 w-full h-full overflow-hidden">
          <VxeTable
            ref={tableRef}
            {...tableConfig.value}
            data={tableData.value}
            onCheckboxChange={handleSelectionChange}
            onCheckboxAll={handleSelectionChange}
            v-slots={{
              empty: () => <span>没有更多数据啦</span>,
            }}
          >

            {columns.value.map((column: CustomVxeColumnProps) => <ColumnItem column={column} />)}
            {/* 操作项 */}
            {showOperation.value && <OperationColumn config={props} />}
          </VxeTable>
        </div>

        <div class="flex h-[100px] justify-end mt-10">
          <ElPagination
            v-model:currentPage={currentPage.value}
            layout="total, sizes, prev, pager, next jumper"
            background
            total={total.value}
            page-sizes={[10, 20, 30, 300]}
            v-model:page-size={defaultPageSize.value}
            defaultPageSize={defaultPageSize.value}

          />
        </div>
      </div>
    )
  },
})
