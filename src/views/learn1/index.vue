<script setup lang="ts">
import { useTable } from './hooks/table-hooks'

const {
  tableConfig,
  total,
  tableData,
  defaultPageSize,

  tableRef,
  currentPage,
  handleClear,
  handleGetData,
  handleChangeCurrentPage,
  handleChangePageSize,
  handleChangeTableRow,
} = useTable()
</script>

<template>
  <div class="w-[80%] h-3/4 flex flex-col">
    <div>
      <div class="flex items-center gap-4">
        <el-button @click="handleGetData">
          获取数据
        </el-button>
        <el-button @click="handleClear">
          清空数据
        </el-button>
      </div>
    </div>
    <div class="flex-1 w-full  overflow-hidden">
      <VxeTable
        ref="tableRef"
        v-bind="tableConfig"
        :data="tableData"
        @current-change="handleChangeTableRow"
      >
        <VxeColumn fields="checkbox" type="checkbox" width="30" />
        <VxeColumn field="index" title="序号" type="seq" width="80" />
        <VxeColumn field="userId" title="u" />
        <VxeColumn field="product_name" show-overflow="tooltip" title="商品名称dadasasdasdasdasdasdasdasdas" />
        <VxeColumn field="product_code" show-overflow="tooltip" title="商品编码" />
        <VxeColumn field="meno" show-overflow="tooltip" title="备注" />
        <VxeColumn field="username" show-overflow="tooltip" title="用户姓名" />
        <VxeColumn field="user_code" show-overflow="tooltip" title="用户编码" />
        <VxeColumn field="addTime" show-overflow="tooltip" title="添加时间" />
        <VxeColumn field="order_name" show-overflow="tooltip" title="订单名称" />
        <VxeColumn field="order_id" show-overflow="tooltip" title="订单id" />
        <VxeColumn field="package_num" show-overflow="tooltip" title="订单数量" />
        <VxeColumn field="weight" show-overflow="tooltip" title="重量" />

        <VxeColumn field="total_weight" title="总重量" :visible="false" />

        <template #empty>
          <div v-loading="true" class="" element-loading-text="数据加载中" />
        </template>
      </VxeTable>
    </div>

    <div class="flex justify-end mt-10">
      <el-pagination
        v-model:current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
        :page-sizes="[10, 20, 30]"
        :default-page-size="defaultPageSize"
        @current-change="handleChangeCurrentPage"
        @size-change="handleChangePageSize"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.vxe-table--body) {
  height: 100% !important;
}
</style>
