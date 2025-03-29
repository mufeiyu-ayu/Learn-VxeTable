import type { PropType, Ref } from 'vue'
import type { VxeTableInstance } from 'vxe-table'
import type { CustomVxeColumnProps, TableProps } from './types/table.ts'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeTable } from 'vxe-table'
import { renderOperationColumn } from './components/table-operation'
import { renderColumn } from './components/table.column'
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
  },
  setup(props: TableProps, { expose }) {
    console.log(props.tableConfig.border, 'props')
    const {
      tableConfig,
      total,
      tableData,
      defaultPageSize,
      tableColumns,
      tableRef,
      currentPage,
      handleChangeCurrentPage,
      handleChangePageSize,
      handleSelectionChange,
    } = setupTable()

    expose({
      a: 1,
      tableRef,
    } as TableExposeInstance)

    return () => (
      <div class="w-full h-full">

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
              {tableColumns.value.map((column: CustomVxeColumnProps) => renderColumn(column))}
              {renderOperationColumn(props)}
            </VxeTable>
          </div>

          <div class="flex h-[100px] justify-end mt-10">
            <ElPagination
              v-model:currentPage={currentPage.value}
              layout="total, sizes, prev, pager, next jumper"
              background
              total={total.value}
              page-sizes={[10, 20, 30, 300]}
              defaultPageSize={defaultPageSize.value}
              onCurrent-change={handleChangeCurrentPage}
              onSize-change={handleChangePageSize}
            />
          </div>
        </div>
      </div>
    )
  },
})
