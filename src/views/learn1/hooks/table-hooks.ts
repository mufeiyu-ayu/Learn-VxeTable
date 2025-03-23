import type { OrderRecord } from '@/apis'

import type { VxeTableEvents, VxeTableInstance, VxeTableProps, VxeTablePropTypes } from 'vxe-table'

import { getProduct } from '@/apis'
import { onMounted, ref } from 'vue'

export function useTable() {
  // const instalance = getCurrentInstance() as ComponentInternalInstance
  // const props = instalance.props

  const tableRef = ref<VxeTableInstance>()

  const tableData = ref<OrderRecord[]>([])
  const defaultPageSize = ref<number>(10)
  // 当前页数
  const currentPage = ref<number>(1)
  // 总条数
  const total = ref<number>()
  // 表尾数据
  const footerData = ref<VxeTablePropTypes.FooterData>([
    { userId: '合计', weight: 333 },
  ])

  const tableConfig = ref<VxeTableProps>({
    scrollX: { enabled: true }, // 启用水平滚动
    // height: '100%', // 设置表格高度为其容器的100%
    autoResize: true, // 响应式就可以自动跟随父容器宽、高动态变化
    size: 'small', // 设置表格尺寸为小
    border: true, // 启用表格边框
    align: 'center', // 将表格单元格内容居中
    round: true, // 启用圆角
    showFooter: false, // 显示表尾数据
    footerData: footerData.value, // 表尾数据
    showOverflow: 'tooltip', // 显示溢出内容
    stripe: false, // 启用斑马线
    maxHeight: '100%',
    rowConfig: { // 行配置
      isCurrent: true,
      isHover: true,
      // resizable: true,

    },
    cellConfig: { // 单元格配置
      // padding: true,
      // height: 75,

    },
    columnConfig: { // 列配置
      minWidth: 100,
      // drag: true,
      // isCurrent: true,
      isHover: true,
      // width: 'auto',
      resizable: true, // 启用列宽拖动
    },
  })

  async function handleGetData() {
    tableData.value = []
    const { code, data } = await getProduct({ page: currentPage.value, pageSize: defaultPageSize.value })
    if (code !== 0)
      return
    tableData.value = data.list
    total.value = data.total
  }
  function handleClear() {
    tableData.value = []
  }

  /**
   * 当前页数改变时触发
   */
  function handleChangeCurrentPage() {
    handleGetData()
  }

  /**
   * 每页大小改变时触发
   * @param val 每页大小
   */
  function handleChangePageSize(val: number) {
    defaultPageSize.value = val
    handleGetData()
  }
  /**
   * 行选中时触发(需要rowConfig.current 为 true 才能触发)
   * @param params 行
   */
  function handleChangeTableRow(params: Parameters<VxeTableEvents.CurrentChange<OrderRecord>>[0]) {
    console.log(params)
  }

  // /**
  //  * 窗口大小改变时自适应行高1
  //  */
  // function handleResize() {
  //   const res: HTMLDivElement = document.querySelector('.vxe-table--row-expanded-wrapper')
  //   const totalHeight = res.offsetHeight
  //   if (totalHeight / 10 < 20)
  //     return
  //   tableConfig.value.cellConfig.height = totalHeight / 10
  // }
  onMounted(async () => {
    await handleGetData()
    // window.addEventListener('resize', handleResize)
  })

  return {
    tableConfig,
    defaultPageSize,
    tableRef,
    currentPage,
    footerData,
    total,
    tableData,
    handleClear,
    handleGetData,
    handleChangeCurrentPage,
    handleChangePageSize,
    handleChangeTableRow,
  }
}
