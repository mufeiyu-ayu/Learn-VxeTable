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
    { name: '合计', money: 333 },
  ])

  const tableConfig = ref({
    scrollX: { enabled: true },
    height: '100%',
    size: 'small',
    border: true,
    align: 'center',

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
