<script setup lang="tsx">
import type { CatalogueItem } from '@/apis2'
import type { TableExposeInstance } from '@/components/tableJSX/index.ts'
import type { TableProps } from '@/components/tableJSX/src/types/table.ts'
import { deleteCardGoods, getCardGoods } from '@/apis2'
import { DataGrid } from '@/components/tableJSX/index.ts'
import { ElButton, ElPopconfirm, ElTag } from 'element-plus'
import { ref } from 'vue'

const tableRef = ref<TableExposeInstance>()
const tableBind = ref<TableProps<Partial<CatalogueItem>>>({
  tableColumns: [
    {
      field: 'catalogueId',
      title: 'id',
    },
    {
      field: 'catalogueName',
      title: '游戏名称',
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
  getTableData: getCardGoods,
  queryContion: {
    gameType: 0,
  },
  operationConfig: {
    deletHandle: deleteCardGoods,
    deleteParams: 'catalogueId',
    render: ({ row }) => {
      return (
        <ElButton
          type="primary"
          onClick={() => {
            const res = tableRef.value?.tableRef.isCheckedByCheckboxRow(row)
            console.log(res, 'res')
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
  <div class="w-full h-full flex flex-col gap-5">
    <div class="h-[200px] w-full">
      查询条件
    </div>
    <div>
      <ElButton @click="handleSearch">
        点击
      </ElButton>
    </div>
    <div class="w-full flex-1">
      <DataGrid ref="tableRef" v-bind="tableBind" />
    </div>
  </div>
</template>

<style scoped>

</style>
