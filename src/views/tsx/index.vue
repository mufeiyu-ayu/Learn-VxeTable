<script setup lang="tsx">
import type { OrderRecord } from '@/apis'
import type { TableProps } from '@/components/tableJSX/src/types/table.ts'
import { getProduct } from '@/apis'
import { DataGrid } from '@/components/tableJSX/index.ts'
import { ElButton } from 'element-plus'

const tableBind: TableProps<Partial<OrderRecord>> = {
  tableConfig: {
    border: true,
  },
  tableColumns: [
    {
      type: 'checkbox' as const,
      field: 'checkbox',
      minWidth: 40,
    },
    {
      type: 'seq',
      title: '序号',
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
      render: () => {
        return <ElButton>hello world</ElButton>
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
      width: 300,
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

  getTableData: getProduct,
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-[80%] h-[700px]">
      <DataGrid v-bind="tableBind" />
    </div>
  </div>
</template>

<style scoped>
:deep(.vxe-table--body) {
  height: 100% !important;
}
</style>
