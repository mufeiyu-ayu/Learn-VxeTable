<script setup lang="tsx">
import type { OrderRecord } from '@/apis'
import type { TableExposeInstance } from '@/components/tableJSX/index.ts'
import type { TableProps } from '@/components/tableJSX/src/types/table.ts'
import { getProduct } from '@/apis'
import { DataGrid } from '@/components/tableJSX/index.ts'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

const tableRef = ref<TableExposeInstance>()
const tableBind = ref<TableProps<Partial<OrderRecord>>>({
  tableConfig: {
    border: true,
  },
  tableColumns: [
    {
      type: 'checkbox',
      field: 'checkbox',
      minWidth: 40,
    },
    {
      type: 'seq',
      title: '序号',
      align: 'center',
    },
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
          <div class=" flex justify-center items-center bg-amber-200">
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
function handleSearch() {
  tableBind.value.queryContion = {
    a: 2,
    c: 2,
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="h-[30px] w-full">
      <ElButton @click="handleSearch">
        点击
      </ElButton>
    </div>
    <div class="w-full h-[calc(100%-30px)]">
      <DataGrid ref="tableRef" v-bind="tableBind" />
    </div>
  </div>
</template>

<style scoped>

</style>
