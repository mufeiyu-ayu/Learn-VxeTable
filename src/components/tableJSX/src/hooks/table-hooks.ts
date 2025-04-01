import type { VxeTableInstance } from 'vxe-table'
import type { TableProps } from '../types'
import { EventTypeEnum } from '@/utils/enums'
import { useEventBus } from '@/utils/eventBus.ts'
import { ElLoading } from 'element-plus'
import { getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { useTableConfig } from './table-config-hooks'

export function setupTable() {
  const instance = getCurrentInstance()
  const tableContainerRef = ref<HTMLElement>()
  const props = instance.props as unknown as TableProps
  const { emit, on } = useEventBus([
    /**   复选框选中触发 */
    `${props.uid}-${EventTypeEnum.DataGrid_ROW_CHANGE}`,
    /**   actionbar 刷新 */
    `${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`,
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
    console.log(tableContainerRef.value, 'tableContainerRef')

    const loading = ElLoading.service({
      fullscreen: false,
      text: '加载中',
      target: tableContainerRef.value,
      background: 'rgba(255, 255, 255, 0.6)',
      // customClass: 'vxe-loading-wrapper',
      lock: true,
    })
    try {
      const res = await props.getTableData({
        page: currentPage.value,
        pageSize: defaultPageSize.value,
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
      loading.close()
    }
  }

  /**  监听选中行 */
  const handleSelectionChange = () => {
    selectedRows.value = tableRef.value?.getCheckboxRecords(true)
  }
  watch(
    [
      () => currentPage.value,
      () => defaultPageSize.value,
      () => props.queryContion,
    ],
    async () => {
      await handleGetData()
    },
    // { immediate: true }, // 首次加载时执行一次
  )

  /**  监听选中行 */
  watch(selectedRows, (newVal) => {
    emit(EventTypeEnum.DataGrid_ROW_CHANGE, ...newVal)
  })

  const initEvent = () => {
    on(`${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`, () => {
      currentPage.value = 1
      handleGetData()
    })
  }
  onMounted(async () => {
    await handleGetData()
    initEvent()
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
    tableContainerRef,
    handleSelectionChange,
    handleGetData,
    clearSelection,

  }
}
