import type { OrderRecord } from '@/apis'

import type { Ref } from 'vue'
import type { VxeTableInstance, VxeTableProps, VxeTablePropTypes } from 'vxe-table'
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

  const tableConfig = ref({
    scrollX: { enabled: true }, // 启用水平滚动
    height: '100%', // 设置表格高度为其容器的100%
    size: 'small', // 设置表格尺寸为小
    border: false, // 启用表格边框
    align: 'center', // 将表格单元格内容居中
    round: true, // 启用圆角
    showFooter: false, // 显示表尾数据
    footerData: footerData.value, // 表尾数据
    stripe: false, // 启用斑马线
    rowConfig: {
      isCurrent: true,
      isHover: true,
    },
  }) as Ref<VxeTableProps>

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
   * @param val 当前页码
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
  }
  onMounted(() => {
    handleGetData()
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
  }
}
