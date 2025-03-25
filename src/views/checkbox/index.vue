<script setup lang="ts">
import { useTable } from './hooks/table-hooks'

const {
  tableConfig,
  total,
  tableData,
  defaultPageSize,
  userTitlePrefix,
  tableRef,
  currentPage,
  handleClear,
  handleGetData,
  handleChangeCurrentPage,
  handleChangePageSize,
  handleSelectionChange,
} = useTable()
</script>

<template>
  <div class="w-full h-full ">
    <div>
      <div class="flex items-center gap-4">
        <ElButton @click="handleGetData">
          获取数据
        </ElButton>
        <ElButton @click="handleClear">
          清空数据
        </ElButton>
      </div>
    </div>
    <div class="w-[80%] h-[600px] flex-1 flex flex-col justify-between">
      <div class="flex-1 w-full h-full overflow-hidden">
        <VxeTable
          ref="tableRef"
          v-bind="tableConfig"
          :data="tableData"
          @checkbox-change="handleSelectionChange"
          @checkbox-all="handleSelectionChange"
        >
          <VxeColumn fields="checkbox" type="checkbox" min-width="40" />
          <VxeColumn
            field="index"
            title="序号"
            type="seq"
            width="80"
          />
          <VxeColumn field="userId" title="uerId" :title-prefix="userTitlePrefix" />
          <VxeColumn field="product_name" title="商品名称dadasasdasdasdasdasdasdasdas" />
          <VxeColumn field="product_code" title="商品编码" />
          <VxeColumn field="meno" title="备注" />
          <VxeColgroup title="用户信息">
            <VxeColumn field="username" title="用户姓名" />
            <VxeColumn field="user_code" title="用户编码" />
            <VxeColumn field="addTime" title="添加时间" />
          </VxeColgroup>
          <VxeColumn field="order_name" title="订单名称" />
          <VxeColumn field="order_id" title="订单id" />
          <VxeColumn
            field="package_num"
            title="订单数量"
            sortable
            sort-type="auto"
          />
          <VxeColumn field="weight" title="重量" />

          <VxeColumn field="total_weight" title="总重量" :visible="false" />
          <!-- 操作 -->
          <VxeColumn
            field="operation"
            fixed="right"
            min-width="200"
            title="操作"
          >
            <template #default>
              <ElButton type="primary">
                编辑
              </ElButton>
              <ElButton type="danger">
                删除
              </ElButton>
            </template>
          </VxeColumn>
          <template #empty>
            <span>没有更多数据啦</span>
          </template>
        </VxeTable>
      </div>

      <div class="flex justify-end mt-10">
        <ElPagination
          v-model:current-page="currentPage"
          layout="total, sizes, prev, pager, next jumper"
          background
          :total="total"
          :page-sizes="[10, 20, 30]"
          :default-page-size="defaultPageSize"
          @current-change="handleChangeCurrentPage"
          @size-change="handleChangePageSize"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.vxe-table--body) {
  height: 100% !important;
}
</style>
