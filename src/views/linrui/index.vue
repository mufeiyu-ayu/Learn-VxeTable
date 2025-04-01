<script setup lang="tsx">
import type { CatalogueItem } from '@/apis2'
import type { TableExposeInstance } from '@/components/tableJSX/index.ts'
import type { TableProps } from '@/components/tableJSX/src/types/table.ts'
import { deleteCardGoods, getCardGoods } from '@/apis2'
import { ActionBar } from '@/components/actionBar/index.ts'
import { DataGrid } from '@/components/tableJSX/index.ts'
import { ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

const tableRef = ref<TableExposeInstance>()
const tableBind = ref<TableProps<Partial<CatalogueItem>>>({
  uid: uuidv4(),
  tableColumns: [
    {
      field: 'catalogueId',
      title: 'id',
    },
    {
      field: 'catalogueName',
      title: '游戏名称',
      width: 800,
    },
    {
      field: 'platformName',
      title: '平台名称',
    },
    {
      field: 'status',
      title: '状态',
      render: ({ row }) => {
        return (
          <ElPopconfirm
            title="确定要执行操作吗?"
            onConfirm={() => {
              console.log(row, 'row')
            }}
            v-slots={{
              reference: () => (
                <ElTag type={row.status ? 'success' : 'danger'}>
                  {row.status ? '正常' : '已下架'}
                </ElTag>
              ),
            }}
          >
          </ElPopconfirm>
        )
      },
    },
    {
      title: '档位管理',
      field: 'fileManage',
      render: () => {
        return (
          <ElButton type="success">
            档位管理
          </ElButton>
        )
      },
    },
  ],
  showOperation: true,
  hideCheckbox: true,
  hideSeq: true,
  getTableData: getCardGoods,
  queryContion: {
    gameType: 0,
  },
  operationConfig: {
    deletHandle: deleteCardGoods,
    deleteParams: 'catalogueId',
    render: ({ row }) => {
      return (
        <>
          <ElButton
            type="primary"
            onClick={() => {
              const res = tableRef.value?.tableRef.isCheckedByCheckboxRow(row)
              console.log(res, 'res')
            }}
          >
            编辑
          </ElButton>
          <ElButton
            type="primary"
            onClick={() => {
              console.log(tableRef.value?.getSelectedRows(), 'tableRef.value?.getSelectedData()')
            }}
          >
            查看
          </ElButton>
        </>

      )
    },
  },
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4">
    <div class="h-[50px]  flex items-center">
      <ActionBar uid="{tableBind.uid}" />
    </div>
    <div class="w-full flex-1 h-[calc(100%-50px)]">
      <DataGrid ref="tableRef" v-bind="tableBind" />
    </div>
  </div>
</template>

<style scoped>

</style>
