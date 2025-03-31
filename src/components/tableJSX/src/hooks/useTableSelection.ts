import type { OrderRecord } from '@/apis'
import type { Ref } from 'vue'
import type { VxeTableInstance } from 'vxe-table'
import { nextTick, ref } from 'vue'

/**
 * 表格选择状态管理 Hook
 * @param tableRef - 表格实例引用
 * @param tableData - 表格数据引用
 */
export function useTableSelection(tableRef: Ref<VxeTableInstance | undefined>, tableData: Ref<OrderRecord[]>) {
  // 使用 Map 存储选中的行数据，key 为行 id
  const selectedRowsMap = ref<Map<string | number, OrderRecord>>(new Map())
  // 用于外部获取选中数据的计算属性
  const selectedRows = ref<OrderRecord[]>([])

  /**
   * 更新选中行数据的数组形式
   */
  const updateSelectedRowsArray = () => {
    selectedRows.value = Array.from(selectedRowsMap.value.values())
  }

  /**
   * 处理表格选择变化
   */
  const handleSelectionChange = () => {
    const currentPageSelection = tableRef.value?.getCheckboxRecords() || []
    console.log('currentPageSelection--------- ', currentPageSelection, 'line:30')
    // 获取当前页所有行的 id
    const currentPageIds = new Set(tableData.value.map(row => row.id))

    // 清除当前页的旧选中状态
    for (const id of currentPageIds) {
      selectedRowsMap.value.delete(id)
    }

    // 添加新的选中状态
    currentPageSelection.forEach((row: OrderRecord) => {
      if (row.id) {
        selectedRowsMap.value.set(row.id, row)
      }
    })

    updateSelectedRowsArray()
  }

  /**
   * 清空所有选中状态
   */
  const clearSelection = () => {
    selectedRowsMap.value.clear()
    updateSelectedRowsArray()
    if (tableRef.value) {
      tableRef.value.clearCheckboxRow()
    }
  }

  /**
   * 设置选中状态
   * @param rows - 要设置为选中的行数据数组
   */
  const setSelection = (rows: OrderRecord[]) => {
    clearSelection()
    rows.forEach((row) => {
      if (row.id) {
        selectedRowsMap.value.set(row.id, row)
      }
    })
    updateSelectedRowsArray()

    // 更新当前页面的选中状态
    nextTick(() => {
      if (tableRef.value) {
        const currentPageIds = new Set(tableData.value.map(row => row.id))
        rows.forEach((row) => {
          console.log(row, 'row')
          if (row.id && currentPageIds.has(row.id)) {
            tableRef.value?.setCheckboxRow(row, true)
          }
        })
      }
    })
  }

  /**
   * 恢复当前页的选中状态
   */
  const restorePageSelection = () => {
    nextTick(() => {
      if (tableRef.value) {
        const currentPageIds = new Set(tableData.value.map(row => row.id))
        for (const [id, row] of selectedRowsMap.value.entries()) {
          if (currentPageIds.has(Number(id))) {
            tableRef.value.setCheckboxRow(row, true)
          }
        }
      }
    })
  }

  return {
    selectedRows,
    handleSelectionChange,
    clearSelection,
    setSelection,
    restorePageSelection,
  }
}
