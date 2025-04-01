import type { ActionBarProps } from '../types'
import { EventTypeEnum } from '@/utils/enums'
import { useEventBus } from '@/utils/eventBus'
import { useThrottle } from '@/utils/throttle' // 导入节流 hook
import { getCurrentInstance } from 'vue'
import { rightButtonsGather } from './button-gather'

export function useActionBarButton() {
  const instance = getCurrentInstance()
  const props = instance.props as unknown as ActionBarProps
  const { emit } = useEventBus([
    `${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`,
  ])

  const handleSearch = () => {
    console.log('搜索')
  }

  const handleImport = () => {
    console.log('导入')
  }

  const handleExport = () => {
    console.log('导出')
  }

  // 使用节流hook包装刷新函数
  const { throttled: throttledReset } = useThrottle(() => {
    emit(`${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`)
  }, 3000)

  const onClick = (item: typeof rightButtonsGather[number]) => {
    const staged = {
      search: handleSearch,
      import: handleImport,
      export: handleExport,
      reset: throttledReset, // 使用节流后的函数
    }
    staged[item.code]()
  }

  return {
    rightButtonsGather,
    handleSearch,
    onClick,

  }
}
