import type { TableProps } from '../types'
import { ElMessage } from 'element-plus'

interface UseTableOperationProps {
  operationConfig: TableProps['operationConfig']
  handleGetData: () => void
}
export function useTableOperation({
  operationConfig,
  handleGetData,
}: UseTableOperationProps) {
  const handleDelete = async (row: unknown) => {
    try {
      await operationConfig?.deletHandle?.(row[operationConfig?.deleteParams])
      ElMessage.success('删除成功')
      await handleGetData()
    }
    catch (error) {
      console.error(error, 'error')
    }
  }
  return {
    handleDelete,
  }
}
