// // @ts-ignore
// import type { PropType } from 'vue'
// import type { JSX } from 'vue/jsx-runtime'
// import type { VxeTableInstance, VxeTableProps } from 'vxe-table'
// import { ElButton, ElPopconfirm, ElProgress, ElTag, ElTooltip } from 'element-plus'
// // CommonTable.tsx
// import { computed, defineComponent, ref } from 'vue'

// // 类型定义
// export interface TableColumn {
//   field: string
//   title: string
//   width?: number | string
//   minWidth?: number
//   fixed?: 'left' | 'right'
//   sortable?: boolean
//   filters?: boolean | Array<{ label: string, value: unknown }>
//   treeNode?: boolean
//   align?: 'left' | 'center' | 'right'
//   render?: (params: {
//     row: unknown
//     column: TableColumn
//     $index: number
//     cellValue: unknown
//   }) => JSX.Element | string | number
//   headerRender?: (params: {
//     column: TableColumn
//     $index: number
//   }) => JSX.Element | string
//   formatter?: (row: unknown) => string | number
//   slots?: {
//     default?: string
//     header?: string
//   }
// }

// // RenderCell 组件
// const RenderCell = defineComponent({
//   name: 'RenderCell',
//   props: {
//     render: {
//       type: Function as PropType<(params: {
//         row: unknown
//         column: TableColumn
//         $index: number
//         cellValue: unknown
//       }) => JSX.Element | string | number>,
//       required: true,
//     },
//     params: {
//       type: Object as PropType<Record<string, unknown>>,
//       required: true,
//     },
//   },
//   setup(props) {
//     return () => {
//       const content = props.render(props.params)
//       return typeof content === 'object' ? content : <span>{content}</span>
//     }
//   },
// })

// // 主表格组件
// export const CommonTable = defineComponent({
//   name: 'CommonTable',
//   props: {
//     columns: {
//       type: Array as PropType<TableColumn[]>,
//       required: true,
//     },
//     data: {
//       type: Array as PropType<unknown[]>,
//       required: true,
//     },
//     showCheckbox: {
//       type: Boolean,
//       default: false,
//     },
//     showPager: {
//       type: Boolean,
//       default: true,
//     },
//     tableConfig: {
//       type: Object as PropType<Partial<VxeTableProps>>,
//       default: () => ({}),
//     },
//     total: {
//       type: Number,
//       default: 0,
//     },
//   },
//   emits: ['selection-change', 'page-change'],
//   setup(props, { emit }) {
//     const tableRef = ref<VxeTableInstance>()
//     const currentPage = ref(1)
//     const pageSize = ref(10)

//     const defaultConfig: VxeTableProps = {
//       border: true,
//       stripe: true,
//       align: 'center',
//       height: 'auto',
//       rowConfig: {
//         isHover: true,
//         keyField: 'id',
//       },
//       columnConfig: {
//         resizable: true,
//         minWidth: 100,
//       },
//     }

//     const tableConfig = computed(() => ({
//       ...defaultConfig,
//       ...props.tableConfig,
//     }))

//     const checkboxConfig = computed(() => ({
//       highlight: true,
//       ...props.tableConfig?.checkboxConfig,
//     }))

//     const handleSelectionChange = () => {
//       const selection = tableRef.value?.getCheckboxRecords() || []
//       emit('selection-change', selection)
//     }

//     const handlePageChange = (page: number) => {
//       emit('page-change', page)
//     }

//     return () => (
//       <div>
//         <vxe-table
//           ref={tableRef}
//           {...tableConfig.value}
//           data={props.data}
//           onCheckboxChange={handleSelectionChange}
//         >
//           {props.showCheckbox && (
//             <vxe-column
//               type="checkbox"
//               width="60"
//               {...checkboxConfig.value}
//             />
//           )}

//           {props.columns.map(column => (
//             <vxe-column
//               key={column.field}
//               field={column.field}
//               title={column.title}
//               width={column.width}
//               minWidth={column.minWidth}
//               fixed={column.fixed}
//               sortable={column.sortable}
//               treeNode={column.treeNode}
//               align={column.align || 'center'}
//               v-slots={{
//                 default: column.render
//                   ? (scope: unknown) => (
//                       <RenderCell
//                         render={column.render!}
//                         params={{
//                           row: scope.row,
//                           column,
//                           $index: scope.$index,
//                           cellValue: scope.row[column.field],
//                         }}
//                       />
//                     )
//                   : undefined,
//                 header: column.headerRender
//                   ? (scope: unknown) => (
//                       <RenderCell
//                         render={column.headerRender!}
//                         params={{
//                           column,
//                           $index: scope.$index,
//                         }}
//                       />
//                     )
//                   : undefined,
//               }}
//             />
//           ))}
//         </vxe-table>

//         {props.showPager && (
//           <vxe-pager
//             v-model:currentPage={currentPage.value}
//             v-model:pageSize={pageSize.value}
//             total={props.total}
//             onPageChange={handlePageChange}
//           />
//         )}
//       </div>
//     )
//   },
// })

// // 使用示例
// export const TableExample = defineComponent({
//   name: 'TableExample',
//   setup() {
//     const handleEdit = (row: unknown) => {
//       console.log('编辑：', row)
//     }

//     const handleDelete = (row: unknown) => {
//       console.log('删除：', row)
//     }

//     const handleRetry = (row: unknown) => {
//       console.log('重试：', row)
//     }

//     const tableData = ref([
//       {
//         id: 1,
//         parentId: null,
//         name: '父节点1',
//         status: '正常',
//         progress: 100,
//         description: '这是一个测试描述',
//       },
//       {
//         id: 2,
//         parentId: 1,
//         name: '子节点1',
//         status: '异常',
//         progress: 30,
//         description: '出现异常，需要处理',
//       },
//     ])

//     const columns: TableColumn[] = [
//       {
//         field: 'name',
//         title: '名称',
//         treeNode: true,
//       },
//       {
//         field: 'status',
//         title: '状态',
//         render: ({ row }) => (
//           <ElTag type={row.status === '正常' ? 'success' : 'danger'}>
//             {row.status}
//           </ElTag>
//         ),
//       },
//       {
//         field: 'operation',
//         title: '操作',
//         width: 200,
//         render: ({ row }) => (
//           <div class="flex gap-2">
//             <ElButton
//               type="primary"
//               size="small"
//               onClick={() => handleEdit(row)}
//             >
//               编辑
//             </ElButton>

//             <ElPopconfirm
//               title="确认删除？"
//               onConfirm={() => handleDelete(row)}
//               v-slots={{
//                 reference: () => (
//                   <ElButton
//                     type="danger"
//                     size="small"
//                   >
//                     删除
//                   </ElButton>
//                 ),
//               }}
//             />
//           </div>
//         ),
//       },
//       {
//         field: 'complex',
//         title: '复杂示例',
//         render: ({ row }) => {
//           const renderStatus = () => {
//             switch (row.status) {
//               case '正常':
//                 return (
//                   <div class="flex items-center">
//                     <div class="w-2 h-2 rounded-full bg-green-500 mr-2" />
//                     <span>正常运行中</span>
//                   </div>
//                 )
//               case '异常':
//                 return (
//                   <div class="flex items-center">
//                     <div class="w-2 h-2 rounded-full bg-red-500 mr-2" />
//                     <span>异常</span>
//                     <ElButton
//                       type="primary"
//                       size="small"
//                       class="ml-2"
//                       onClick={() => handleRetry(row)}
//                     >
//                       重试
//                     </ElButton>
//                   </div>
//                 )
//               default:
//                 return <span>未知状态</span>
//             }
//           }

//           return (
//             <div class="complex-cell">
//               <div class="title">{row.name}</div>
//               <div class="content">
//                 {renderStatus()}
//                 {row.description && (
//                   <ElTooltip
//                     content={row.description}
//                     placement="top"
//                     v-slots={{
//                       default: () => (
//                         <i class="el-icon-info-filled cursor-pointer ml-2" />
//                       ),
//                     }}
//                   />
//                 )}
//               </div>
//               <div class="footer">
//                 <ElProgress
//                   percentage={row.progress}
//                   status={row.progress === 100 ? 'success' : 'processing'}
//                 />
//               </div>
//             </div>
//           )
//         },
//       },
//     ]

//     return () => (
//       <CommonTable
//         columns={[]}
//         data={[]}
//         showCheckbox={true}

//       />
//     )
//   },
// })

// export default TableExample
