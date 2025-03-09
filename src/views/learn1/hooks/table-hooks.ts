import type { OrderRecord } from '@/apis'
import type { ElLoading } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import type { VxeComponentSizeType, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
import { getProduct } from '@/apis'
import { getCurrentInstance, onMounted, ref } from 'vue'

export function useTable() {
  const instalance = getCurrentInstance() as ComponentInternalInstance
  const props = instalance.props
  const tableRef = ref<VxeTableInstance>()
  const loadingInstance = ref<ReturnType<typeof ElLoading.service>>()
  const tableData = ref<OrderRecord[]>([])
  const size = ref<VxeComponentSizeType>('medium')
  const switchBorder = ref<boolean>(false)
  const footerData = ref<VxeTablePropTypes.FooterData>([
    { name: '合计', money: 333 },
  ])

  async function handleGetData() {
    const { code, data } = await getProduct({ page: 1, pageSize: 10 })
    if (code !== 0)
      return
    tableData.value = data.list
  }
  function handleClear() {
    loadingInstance.value?.close()
  }
  onMounted(() => {
    handleGetData()
  })

  return {
    props,
    switchBorder,
    tableRef,
    size,
    footerData,
    tableData,
    handleClear,
    handleGetData,
  }
}
