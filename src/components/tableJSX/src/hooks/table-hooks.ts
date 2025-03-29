import type { OrderRecord } from '@/apis'
import type { VxeColumnProps, VxeTableInstance, VxeTableProps } from 'vxe-table'
import type { TableProps } from '../types/table'
import { getProduct } from '@/apis'
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'

export function setupTable() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as TableProps
  const tableRef = ref<VxeTableInstance>()
  const tableData = ref<OrderRecord[]>([])
  const defaultPageSize = ref<number>(10)
  const currentPage = ref<number>(1)
  const tableColumns = ref<VxeColumnProps[]>()
  const total = ref<number>()

  // 存储选中的行数据
  const selectedRows = ref<OrderRecord[]>([])
  const tableConfig = ref<VxeTableProps>()
  const oldTableConfig = ref<VxeTableProps>({
    scrollX: { enabled: true },
    height: '100%',
    autoResize: true,
    size: 'medium',
    loading: true,
    border: true,
    align: 'center',
    round: true,
    showFooter: false,
    showOverflow: 'tooltip',
    columnConfig: {
      minWidth: 100,
      resizable: true,
    },
    rowConfig: {
      isHover: true,
      keyField: 'id', // 指定行数据的唯一标识字段
      resizable: true,
    },
    checkboxConfig: {
      // reserve: false, // 保留选中状态
      highlight: true, // 高亮选中状态
      // range: true, // 开启复选框范围选择功能，启用后通过鼠标在复选框的列内滑动选中或取消指定行
      // showReserveStatus: true, // 显示保留选中状态
      checkMethod: ({ row }: { row: OrderRecord }) => {
        return row.package_num < 80 // 控制哪些数据无法被选中
      },
    },
    sortConfig: {
      defaultSort: {
        field: 'package_num',
        order: 'desc', // desc降序 asc 升序
      },
    },
    editConfig: {
      trigger: 'click',
      mode: 'row',
    },
    // treeConfig: {
    //   transform: true,
    //   rowField: 'id',
    //   parentField: 'parentId',
    // },
  })

  const userTitlePrefix = ref({
    useHTML: true,
    content: 'hello world',
  })

  // 处理选择变化
  const handleSelectionChange = () => {
    // 通过 tableRef 获取当前选中的所有行数据
    const selection = tableRef.value?.getCheckboxRecords() || []
    selectedRows.value = selection
  }

  async function handleGetData() {
    tableConfig.value.loading = true
    try {
      const { code, data } = await getProduct({
        page: currentPage.value,
        pageSize: defaultPageSize.value,
      })

      if (code !== 0)
        return

      tableData.value = data.list
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

  function handleClear() {
    tableData.value = []
    // 清空选中状态
    selectedRows.value = []
    if (tableRef.value) {
      tableRef.value.clearCheckboxRow()
    }
  }

  function handleChangeCurrentPage(page: number) {
    currentPage.value = page
    handleGetData()
  }

  function handleChangePageSize(val: number) {
    defaultPageSize.value = val
    currentPage.value = 1
    handleGetData()
  }

  // 获取所有选中数据的方法
  const getSelectedData = () => {
    return selectedRows.value
  }

  function initTable() {
    tableConfig.value = Object.assign(oldTableConfig.value, props.tableConfig)
    tableColumns.value = props.tableColumns
  }
  onMounted(async () => {
    await initTable()
    await handleGetData()
  })

  return {
    tableConfig,
    tableColumns,
    defaultPageSize,
    tableRef,
    currentPage,
    total,
    tableData,
    selectedRows,
    getSelectedData,
    handleSelectionChange,
    handleClear,
    handleGetData,
    handleChangeCurrentPage,
    handleChangePageSize,
    userTitlePrefix,
  }
}
