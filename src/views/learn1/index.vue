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
} = useTable()
</script>

<template>
  <div class="w-[80%] h-[800px] flex flex-col">
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
    <div class="flex-1 w-full">
      <vxe-table ref="tableRef" v-bind="tableConfig" :data="tableData">
        >

        <vxe-column fields="checkbox" type="checkbox" width="30" />
        <vxe-column field="userId" title="用户id" />
        <vxe-column field="product_name" title="商品名称" />
        <vxe-column field="product_code" title="商品编码" />
        <vxe-column field="meno" show-overflow="tooltip" title="备注" />
        <vxe-column field="username" title="用户姓名" />
        <vxe-column field="user_code" title="用户编码" />
        <vxe-column field="addTime" title="添加时间" />
        <vxe-column field="order_name" title="订单名称" />
        <vxe-column field="order_id" title="订单id" />
        <vxe-column field="package_num" title="订单数量" />
        <vxe-column field="weight" title="重量" />
        <vxe-column field="total_weight" title="总重量" :visible="false" />

        <template #empty>
          <div v-loading="true" class="" element-loading-text="数据加载中" />
        </template>
      </vxe-table>
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
