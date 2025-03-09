<script setup lang="ts">
import { useTable } from './hooks/table-hooks'

const { tableData, switchBorder, tableRef, size, footerData, handleClear, handleGetData } = useTable()
</script>

<template>
  <div class="w-full">
    <div>
      <div class="flex items-center gap-4">
        <span> 显影边框</span>
        <el-switch v-model="switchBorder" />
        <el-button @click="handleGetData">
          获取数据
        </el-button>
        <el-button @click="handleClear">
          清空数据
        </el-button>
      </div>
    </div>
    <vxe-table ref="tableRef" :size="size" :border="switchBorder" align="center" :data="tableData" :footer-data="footerData">
      >

      <vxe-column fields="checkbox" type="checkbox" width="60" />
      <vxe-column field="userId" title="用户id" />
      <vxe-column field="product_name" title="商品名称" />
      <vxe-column field="product_code" title="商品编码" />
      <vxe-column field="meno" title="备注" show-overflow />
      <vxe-column field="username" title="用户姓名" />
      <vxe-column field="user_code" title="用户编码" />
      <vxe-column field="addTime" title="添加时间" />
      <vxe-column field="order_name" title="订单名称" />
      <vxe-column field="order_id" title="订单id" />
      <vxe-column field="package_num" title="订单数量" />
      <vxe-column field="weight" title="重量" />
      <vxe-column field="total_weight" title="总重量" />

      <template #empty>
        <div v-loading="true" class="" element-loading-text="数据加载中" />
      </template>
    </vxe-table>
    <!-- <el-pagination :total="" :page-count="paginationPageCount" :current-page="paginationCurrentPage"></el-pagination> -->
  </div>
</template>
