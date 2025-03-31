import type { PropType } from 'vue'
import type { CustomVxeColumnProps, TableExposeInstance, TableProps } from './types'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeColumn, VxeTable } from 'vxe-table'
import { OperationColumn } from './components/table-operation'
import { ColumnItem } from './components/table.column'
import { setupTable } from './hooks/table-hooks.ts'

import './styles/index.css'
// 定义要暴露的方法和属性的类型

export default defineComponent({
  name: 'DataGrid',
  props: {
    uid: {
      type: String as PropType<TableProps['uid']>,
      required: true,
    },
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
    },
    queryContion: {
      type: Object as PropType<TableProps['showOperation']>,
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
      handleGetData,
      showOperation,

    } = setupTable()

    expose({
      tableRef,
      handleGetData,
      // getSelectedRows,
    } as unknown as TableExposeInstance)

    return () => (
      <div class="w-full h-full flex flex-col overflow-hidden">
        <div class="flex-1 w-full">
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
            <VxeColumn type="checkbox" width={60} fixed="left" />
            <VxeColumn type="seq" fixed="left" />
            {columns.value.map((column: CustomVxeColumnProps) => <ColumnItem column={column} />)}
            {/* 操作项 */}
            {showOperation.value && <OperationColumn handleGetData={handleGetData} operationConfig={props.operationConfig} />}
          </VxeTable>
        </div>

        <div class="flex justify-end box py-10 pr-10">
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
