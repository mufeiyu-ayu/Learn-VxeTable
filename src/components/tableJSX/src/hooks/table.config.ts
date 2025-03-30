import type { VxeColumnProps, VxeTableProps } from 'vxe-table'
import type { TableProps } from '../types/table'
import { ref } from 'vue'

export function useTableConfig(props: TableProps) {
  const tableConfig = ref<VxeTableProps>()
  const tableColumns = ref<VxeColumnProps[]>([])

  const oldTableConfig = ref<VxeTableProps>({
    scrollX: { enabled: true },
    height: '100%',
    maxHeight: '100%',
    autoResize: true,
    syncResize: true,
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
      // height:100,
      isHover: true,
      keyField: 'id', // 指定行数据的唯一标识字段
      resizable: true,
    },
    checkboxConfig: {
      // reserve: false, // 保留选中状态
      highlight: true, // 高亮选中状态
      range: true, // 开启复选框范围选择功能，启用后通过鼠标在复选框的列内滑动选中或
    },
  })

  /**
   * 初始化表格配置
   */
  function initTableConfig() {
    tableConfig.value = Object.assign(oldTableConfig.value, props.tableConfig)
    tableColumns.value = props.tableColumns.map((column) => {
      return {
        ...column,
        minWidth: column.minWidth || 60,
        maxWidth: column.maxWidth || 200,
        resizable: column.resizable ?? true,
        showOverflow: column.showOverflow || 'tooltip',
        className: column.className || column.field,
      }
    })
    return {
      tableConfig,
      tableColumns,
    }
  }
  return {

    initTableConfig,
  }
}
