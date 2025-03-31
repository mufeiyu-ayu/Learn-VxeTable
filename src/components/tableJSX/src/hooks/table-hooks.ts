import type { OrderRecord } from '@/apis'
import type { VxeTableInstance } from 'vxe-table'
import type { TableProps } from '../types'
import { getCurrentInstance, nextTick, onMounted, ref, watchEffect } from 'vue'
import { useTableConfig } from './table-config-hooks'
import { useTableSelection } from './useTableSelection'

export function setupTable() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as TableProps

  const { initTableConfig } = useTableConfig(props)
  const { tableConfig, tableColumns } = initTableConfig()
  const tableRef = ref<VxeTableInstance>()
  const tableData = ref<OrderRecord[]>([])
  const defaultPageSize = ref<number>(10)
  const currentPage = ref<number>(1)
  const total = ref<number>()
  /*   是否显示操作列 */
  const showOperation = ref<boolean>(props.showOperation)

  // 使用选择状态管理 hook
  const {
    selectedRows,
    handleSelectionChange,
    clearSelection,
    setSelection,
    restorePageSelection,
  } = useTableSelection(tableRef, tableData)

  /**  获取列表数据 */
  async function handleGetData() {
    tableConfig.value.loading = true
    // 延迟 3 秒
    await new Promise(resolve => setTimeout(resolve, 900))
    try {
      const res = await props.getTableData({
        current: currentPage.value,
        size: defaultPageSize.value,
        ...props?.queryContion || null,
      })
      // @ts-ignore
      if (res?.records?.length === 0)
        return
      // @ts-ignore
      tableData.value = res.records
      // @ts-ignore
      total.value = res.total

      // 恢复选中状态
      restorePageSelection()
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

  onMounted(async () => {
    // 确保在组件完全挂载后执行
    await nextTick() // 再等一次，确保 DOM 完全更新
    tableRef.value?.recalculate(true)
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
    clearSelection,
    setSelection,
  }
}
