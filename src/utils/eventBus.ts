import type { Emitter } from 'mitt'
import type { CustomEventBusCallbackType, CustomEventType, EventBusType } from './types'
import mitt from 'mitt'
import { onUnmounted } from 'vue'

const emitter: Emitter<Record<string, unknown>> = mitt()

export function useEventBus(eventNames: string[]): EventBusType {
  /**
   * 定义事件总线
   * @param {CustomEventType} eventName 事件名称
   * @param {*[]} args 参数
   */
  const emit = <T = unknown>(eventName: CustomEventType, ...args: T[]) => {
    emitter.emit(eventName, args)
  }
  /**
   * 接收器
   * @param {CustomEventType} eventName 事件名称
   * @param {CustomEventBusCallbackType} callback 回调
   */
  const on = (eventName: CustomEventType, callback: CustomEventBusCallbackType) => {
    emitter.on(eventName, callback)
  }

  const off = (eventName: CustomEventType) => {
    emitter.off(eventName)
  }

  // 组件销毁事件
  onUnmounted(() => {
    console.log('组件销毁事件')
    if (eventNames && eventNames.length) {
      eventNames.forEach(eventName => emitter.off(eventName))
    }
  })

  return {
    emit,
    on,
    off,
  }
}
