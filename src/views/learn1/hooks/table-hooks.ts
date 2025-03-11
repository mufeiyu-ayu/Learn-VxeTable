import type { OrderRecord } from '@/apis'

import type { ComponentInternalInstance } from 'vue'
import type { VxeComponentSizeType, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
import { getProduct } from '@/apis'

import { getCurrentInstance, onMounted, ref } from 'vue'

export function useTable() {
  const instalance = getCurrentInstance() as ComponentInternalInstance
  const props = instalance.props

  // 组件实例

  const tableRef = ref<VxeTableInstance>()

  const tableData = ref<OrderRecord[]>([])
  const size = ref<VxeComponentSizeType>('small')
  const defaultPageSize = ref<number>(10)
  // 当前页数
  const currentPage = ref<number>(1)
  const switchBorder = ref<boolean>(false)
  // 总条数
  const total = ref<number>()
  // 表尾数据
  const footerData = ref<VxeTablePropTypes.FooterData>([
    { name: '合计', money: 333 },
  ])

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
    props,
    switchBorder,
    defaultPageSize,
    tableRef,
    currentPage,
    size,
    footerData,
    total,
    tableData,
    handleClear,
    handleGetData,
    handleChangeCurrentPage,
    handleChangePageSize,
  }
}
