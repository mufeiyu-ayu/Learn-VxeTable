import type { VxeTableInstance } from 'vxe-table'
import type { TableProps } from '../types'
import { EventTypeEnum } from '@/utils/enums'
import { useEventBus } from '@/utils/eventBus.ts'
import { getCurrentInstance, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useTableConfig } from './table-config-hooks'

export function setupTable() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as TableProps
  const { emit } = useEventBus([
    /**   复选框选中触发 */
    `${props.uid}-${EventTypeEnum.DataGrid_ROW_CHANGE}`,
  ])
  const selectedRows = ref<unknown[]>([])
  const { initTableConfig } = useTableConfig(props)
  const { tableConfig, tableColumns } = initTableConfig()
  const tableRef = ref<VxeTableInstance>()
  const tableData = ref<unknown[]>([])
  const defaultPageSize = ref<number>(10)
  const currentPage = ref<number>(1)
  const total = ref<number>()
  /*   是否显示操作列 */
  const showOperation = ref<boolean>(props.showOperation)

  /**
   * 清空所有选中状态
   */
  const clearSelection = () => {
    if (tableRef.value) {
      tableRef.value.clearCheckboxRow()
    }
  }

  /**  获取列表数据 */
  async function handleGetData() {
    tableConfig.value.loading = true

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
      // tableData.value = res.records
      // @ts-ignore
      // total.value = res.total

      // ayu
      tableData.value = res.data.list
      // @ts-ignore
      total.value = res.data.total
      tableRef.value?.clearCheckboxRow()
      selectedRows.value = []
      // 恢复选中状态
    }
    catch (error) {
      console.error('获取数据失败：', error)
    }
    finally {
      tableConfig.value.loading = false
    }
  }

  /**  监听选中行 */
  const handleSelectionChange = () => {
    selectedRows.value = tableRef.value?.getCheckboxRecords(true)
  }
  watchEffect(async () => {
    // 自动追踪 currentPage，defaultPageSize，以及 props.queryContion
    await handleGetData()
  })

  /**  监听选中行 */
  watch(selectedRows, (newVal) => {
    emit(EventTypeEnum.DataGrid_ROW_CHANGE, ...newVal)
  })
  onMounted(async () => {
    // 确保在组件完全挂载后执行
    await nextTick() // 再等一次，确保 DOM 完全更新
    // tableRef.value?.recalculate(true)
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
    handleSelectionChange,
    handleGetData,
    clearSelection,

  }
}
