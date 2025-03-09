import type { CreateAxiosOptionsType } from '@ayu-mu/model'
import { AyuAxios } from './request.ts'

// 全局请求默认配置

const defaultOptions: CreateAxiosOptionsType = {
  timeout: 100000,
  requestOptions: {
    withXAppId: true,
    withToken: true,
    withTenantId: true,
    isShowErrorMessage: true,
  },
}

/**
 * 创建axios实例
 * @param options 请求配置
 * @returns 请求实例
 */
function createAxios(options: Partial<CreateAxiosOptionsType> = {}) {
  return new AyuAxios(Object.assign(defaultOptions, options))
}

const http = createAxios()

export { createAxios, http }
