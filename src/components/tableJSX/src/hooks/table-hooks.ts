import type { OrderRecord } from '@/apis'
import type { VxeTableInstance } from 'vxe-table'
import type { TableProps } from '../types'
import { getCurrentInstance, nextTick, ref, watchEffect } from 'vue'
import { useTableConfig } from './table.config'

export function setupTable() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as TableProps
  console.log(props, 'props')
  const { initTableConfig } = useTableConfig(props)
  const { tableConfig, tableColumns } = initTableConfig()
  const tableRef = ref<VxeTableInstance>()
  const tableData = ref<OrderRecord[]>([])
  const defaultPageSize = ref<number>(10)
  const currentPage = ref<number>(1)
  const total = ref<number>()
  /*   是否显示操作列 */
  const showOperation = ref<boolean>(props.showOperation)
  // 存储选中的行数据
  const selectedRows = ref<OrderRecord[]>([])

  // 处理选择变化
  const handleSelectionChange = () => {
    // 通过 tableRef 获取当前选中的所有行数据
    const selection = tableRef.value?.getCheckboxRecords() || []
    selectedRows.value = selection
  }

  async function handleGetData() {
    tableConfig.value.loading = true
    try {
      const { code, data } = await props.getTableData({
        page: currentPage.value,
        pageSize: defaultPageSize.value,
        ...props?.queryContion || null,
      })

      if (code !== 0)
        return

      tableData.value = data.list
      // @ts-ignore

      total.value = data.total

      // 数据加载完成后，如果需要可以手动设置选中状态
      nextTick(() => {
        if (tableRef.value) {
          // 找出当前页面中应该被选中的行
          const currentPageSelectedRows = tableData.value.filter(row =>
            selectedRows.value.some(selected => selected.id === row.id),
          )
          // 重新选中这些行
          currentPageSelectedRows.forEach((row) => {
            tableRef.value?.setCheckboxRow(row, true)
          })
        }
      })
    }
    catch (error) {
      console.error('获取数据失败：', error)
    }
    finally {
      tableConfig.value.loading = false
    }
  }

  // 获取所有选中数据的方法
  const getSelectedData = () => {
    return selectedRows.value
  }

  watchEffect(async () => {
    // 自动追踪 currentPage，defaultPageSize，以及 props.queryContion
    await handleGetData()
  })

  return {
    tableConfig,
    tableColumns,
    showOperation,
    defaultPageSize,
    tableRef,
    currentPage,
    total,
    tableData,
    selectedRows,
    getSelectedData,
    handleSelectionChange,
    handleGetData,

  }
}
