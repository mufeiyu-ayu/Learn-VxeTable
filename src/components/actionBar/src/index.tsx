import type { PropType } from 'vue'
import type { ActionBarProps } from './types/actionbar'
import { Folder, FolderOpened, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import { useActionBar } from './hooks/actionBar'

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
    const { selectedRows, handleDeleteAll } = useActionBar()

    return () => (
      <div class="w-full h-full flex items-center justify-between">
        <div class="flex-1 flex items-center gap-2" v-slots={{}}>
          {props.leftButtons && props.leftButtons(1)}
          {!props.isHideDelete && <ElButton onClick={handleDeleteAll} type="danger" disabled={selectedRows.value.length === 0}>批量删除</ElButton>}
        </div>
        <div class="flex mr-4 gap-2">
          {slots.search?.() || <ElButton plain circle type="primary" icon={Search} />}
          {slots.folder?.() || <ElButton plain circle type="primary" icon={Folder} />}
          {slots.folderOpen?.() || <ElButton plain circle type="primary" icon={FolderOpened} />}
          {slots.refresh?.() || <ElButton plain circle type="primary" icon={Refresh} />}
          {slots.other?.()}
        </div>
      </div>
    )
  },
})
