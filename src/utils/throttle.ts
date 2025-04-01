// utils/throttle.ts
import { ref } from 'vue'

export function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 1000,
) {
  const loading = ref(false)
  const lastTime = ref(0)

  const throttled = async (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime.value >= delay && !loading.value) {
      try {
        loading.value = true // 设置 loading 状态
        await fn(...args)
        lastTime.value = now
      }
      finally {
        loading.value = false // 清除 loading 状态
      }
    }
  }

  return {
    throttled,
    loading, // 返回响应式的 loading 状态
  }
}
