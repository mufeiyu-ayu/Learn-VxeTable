<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { login } from '@/apis2'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
})

// 表单引用
const loginFormRef = ref<FormInstance>()

// 登录处理
async function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  console.log(loginForm, 'loginForm')
  const res = await login(loginForm)
  if (res?.userId) {
    router.push('/tsx')
  }
}
</script>

<template>
  <div class="min-h-screen w-full  bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <!-- 头部 -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          欢迎登录
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          请输入您的账号和密码
        </p>
      </div>

      <!-- 登录表单 -->
      <ElForm
        ref="loginFormRef"
        :model="loginForm"

        class="mt-8 space-y-6"
      >
        <!-- 用户名输入框 -->
        <ElFormItem prop="username">
          <ElInput
            v-model="loginForm.username"
            placeholder="请输入用户名"

            size="large"
            class="rounded-md"
          />
        </ElFormItem>

        <!-- 密码输入框 -->
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"

            size="large"
            show-password
            class="rounded-md"
          />
        </ElFormItem>

        <!-- 登录按钮 -->
        <ElFormItem>
          <ElButton
            type="primary"
            size="large"
            class="w-full"
            @click="handleLogin(loginFormRef)"
          >
            登 录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
