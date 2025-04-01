import type { ActionBarProps } from '../types'
import { EventTypeEnum } from '@/utils/enums'
import { useEventBus } from '@/utils/eventBus.ts'
import { getCurrentInstance, ref } from 'vue'

export function useActionBar() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as ActionBarProps
  const selectedRows = ref<unknown[]>([])
  const { on } = useEventBus([
    `${props.uid}-${EventTypeEnum.DataGrid_ROW_CHANGE}`,
  ])

  /**   行选中触发 */
  on(EventTypeEnum.DataGrid_ROW_CHANGE, (...records) => {
    const res = records[0] as unknown[]
    selectedRows.value = res
  })

  /**   批量删除 */
  const handleDeleteAll = async () => {
    const res = await props.handleDeleteAll?.(props.deleteAllParams)
    console.log(res, 'res')
  }
  //
  return {
    selectedRows,
    handleDeleteAll,
  }
}
