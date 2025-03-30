import type { PropType } from 'vue'
import type { CustomVxeColumnProps, TableExposeInstance, TableProps } from './types'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeTable } from 'vxe-table'
import { OperationColumn } from './components/table-operation'
import { ColumnItem } from './components/table.column'
import { setupTable } from './hooks/table-hooks.ts'
// 定义要暴露的方法和属性的类型

export default defineComponent({
  name: 'DataGrid',
  props: {
    tableConfig: {
      type: Object as PropType<TableProps['tableConfig']>,
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
    queryContion: {
      type: Object as PropType<TableProps['showOperation']>,
    },
  },
  setup(props: TableProps, { expose }) {
    console.log(props, 'props')
    const {
      tableConfig,
      total,
      tableData,
      defaultPageSize,
      tableColumns: columns,
      tableRef,
      currentPage,
      handleSelectionChange,
      handleGetData,
      showOperation,
    } = setupTable()

    expose({
      a: 1,
      tableRef,
      handleGetData,
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
