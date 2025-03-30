import type { PropType } from 'vue'
import type { TableProps } from '../types'
import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'
/**
 * 渲染操作列
 */
export const OperationColumn = defineComponent({
  name: 'OperationColumn',
  props: {
    config: {
      type: Object as PropType<TableProps>,
      required: true,
    },
  },
  setup(props) {
    // 只会在组件初始化时执行一次
    console.log(props.config, 'props')

    return () => (
      <VxeColumn
        field="operation"
        fixed="right"
        minWidth={200}
        title="操作"
        v-slots={{
          default: () => (
            <>
              <ElButton type="primary">编辑</ElButton>
              <ElButton type="danger">删除</ElButton>
            </>
          ),
        }}
      />
    )
  },
})
