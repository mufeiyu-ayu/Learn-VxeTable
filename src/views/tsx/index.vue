<script setup lang="tsx">
import type { OrderRecord } from '@/apis'
import type { ActionBarProps } from '@/components/actionBar'
import type { TableExposeInstance } from '@/components/tableJSX/index.ts'
import type { TableProps } from '@/components/tableJSX/src/types/table.ts'
import type { Ref } from 'vue'
import { getProduct } from '@/apis'
import { ActionBar } from '@/components/actionBar'
import { QueryBar } from '@/components/queryBar'
import { DataGrid } from '@/components/tableJSX/index.ts'
import { ElButton } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const uid = uuidv4()
const tableRef = ref<TableExposeInstance>()
const actionBarRef = ref<InstanceType<typeof ActionBar>>()
const actionBarBind = ref<ActionBarProps>({
  uid,
  handleDeleteAll: async () => {
    console.log('删除所有')
    return Promise.resolve(22)
  },
  deleteAllParams: 'id',
  leftButtons: () => {
    return (
      <>
        <ElButton
          type="primary"
          onClick={() => {
            console.log(tableRef.value?.tableRef.getCheckboxRecords(true))
          }}
        >
          新增
        </ElButton>
        <ElButton type="success" disabled>
          批量定制
        </ElButton>
      </>
    )
  },
})
const tableBind = ref<TableProps<Partial<OrderRecord>>>({
  uid,
  tableConfig: {
    border: true,
  },
  tableColumns: [
    {
      field: 'id',
      title: 'id',
      treeNode: true,
      rowResize: true,
    },
    {
      field: 'userId',
      title: 'uerId',
      titlePrefix: {
        content: 'userTitlePrefix',
      },
      render: ({ row }) => {
        return (
          <div class=" flex justify-center  items-center ">
            <ElButton onClick={() => {
              console.log(row, 'row')
            }}
            >
              hello world
            </ElButton>
          </div>
        )
      },
    },
    {
      field: 'parentId',
      title: '父级id',
      editRender: { name: 'VxeInput' },
    },
    {
      field: 'product_name',
      title: '商品名称dadasasdasdasdasdasdasdasdas',
      width: 200,
    },
    {
      field: 'product_code',
      title: '商品编码',
    },
    {
      field: 'meno',
      title: '备注',
    },
    {
      field: 'order_name',
      title: '订单名称',
    },
    {
      field: 'order_id',
      title: '订单id',
    },
    {
      field: 'package_num',
      title: '订单数量',
      sortType: 'number',
      sortable: true,
    },
    {
      field: 'weight',
      title: '重量',
    },
    {
      field: 'total_weight',
      title: '总重量',
      visible: false,
    },
  ],
  showOperation: true,
  getTableData: getProduct,
  queryContion: {
    a: 1,
    b: 2,
  },
  operationConfig: {
    deletHandle: () => {
      console.log('删除')
    },
    render: ({ row }) => {
      return (
        <ElButton
          type="primary"
          onClick={() => {
            console.log(row, 'row')
          }}
        >
          编辑
        </ElButton>
      )
    },
  },
})
let res = false
function onClick(selectedRows: Ref<unknown[]>) {
  console.log('点击', selectedRows.value)
  res = !res
  actionBarBind.value.isHideRightButton = res
  router.push('/learn1')
}
</script>

<template>
  <div class="w-full h-[80%] flex flex-col">
    <div>
      <QueryBar />
    </div>
    <div class="h-[80px] flex items-center">
      <ActionBar v-bind="actionBarBind" ref="actionBarRef">
        <template #rightButton="{ selectedRows }">
          <ElButton @click="onClick(selectedRows)">
            点击
          </ElButton>
        </template>
      </ActionBar>
    </div>
    <div class="w-full flex-1">
      <DataGrid ref="tableRef" v-bind="tableBind" />
    </div>
  </div>
</template>

<style scoped>

</style>
