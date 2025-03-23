<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div class="w-screen bg-gray-50 h-screen flex">
    <ElConfigProvider :locale="zhCn">
      <RouterView />
    </ElConfigProvider>
  </div>
</template>
