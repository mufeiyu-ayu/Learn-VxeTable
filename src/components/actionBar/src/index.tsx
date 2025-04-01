import type { PropType } from 'vue'
import type { ActionBarProps } from './types/actionbar'
import { ElButton, ElTooltip } from 'element-plus'
import { defineComponent, toRefs } from 'vue'
import { useActionBar } from './hooks/actionBar'
import { useActionBarButton } from './hooks/actionBar-action.ts'

export default defineComponent({
  name: 'ActionBar',
  props: {
    uid: {
      type: String as PropType<ActionBarProps['uid']>,
      required: true,
    },
    isHideDelete: {
      type: Boolean as PropType<ActionBarProps['isHideDelete']>,
      default: false,
    },
    isHideRightButton: {
      type: Boolean as PropType<ActionBarProps['isHideRightButton']>,
      default: false,
    },
    deleteAllParams: {
      type: String as PropType<ActionBarProps['deleteAllParams']>,
      default: '',
    },
    handleDeleteAll: {
      type: Function as PropType<ActionBarProps['handleDeleteAll']>,
      required: false,
    },
    leftButtons: {
      type: Function as PropType<ActionBarProps['leftButtons']>,
    },
  },
  setup(props, { slots }) {
    const { isHideRightButton } = toRefs(props)
    const { selectedRows, handleDeleteAll } = useActionBar()
    const { rightButtonsGather, onClick } = useActionBarButton()
    return () => (
      <div class="w-full h-full flex items-center justify-between">
        <div class="flex-1 flex items-center gap-2" v-slots={{}}>
          {props.leftButtons && props.leftButtons(1)}
          {!props.isHideDelete && <ElButton onClick={handleDeleteAll} type="danger" disabled={selectedRows.value.length === 0}>批量删除</ElButton>}
        </div>
        <div class="flex mr-4 gap-2">
          {!isHideRightButton.value && rightButtonsGather.map(item => (

            slots[item.code]?.({ selectedRows }) || (
              <ElTooltip content={item.title} placement="top">
                <ElButton {...item} onClick={() => onClick(item)} />
              </ElTooltip>
            )
          ))}
          {slots.rightButton?.({ selectedRows })}

        </div>
      </div>
    )
  },
})
