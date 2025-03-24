# 你写后台你不会写表格？我直接手撕 VXE-TABLE

**作为一个爱唱跳 rap，开发时长 2 年半的前端狗，经常在写后台，遇到表格很多古怪玩意，每次都要百度，问 ai，但有时候还是写不出来，所以就自己手撕了 VXE-TABLE 的表格组件，当我手搓 VXE-TABLE后再搭配cursor。请问阁下应当如何应对？**
## 开发环境设置

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 测试一下嗲嘛合并 111111



1.  **克隆项目**

```bash
git clone https://github.com/x-extends/vxe-table.git
cd vxe-table
```

2. **安装依赖**

```bash
pnpm install
```

3. **启动开发服务器**

```bash
pnpm build
```

5. **代码检查**

```bash
pnpm lint
```

## 项目结构

```
vxt-table/
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── views/         # 页面视图
│   ├── stores/        # Pinia 状态管理
│   ├── types/         # TypeScript 类型定义
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── public/            # 公共资源
├── vite.config.ts     # Vite 配置
├── tsconfig.json      # TypeScript 配置
├── .eslintrc.js      # ESLint 配置
└── package.json       # 项目依赖
```

## 功能特性

- [ ] 基础表格展示
- [ ] 表格分页
- [ ] 排序功能
- [ ] 筛选功能
- [ ] 编辑表格
- [ ] 自定义列
- [ ] 导出功能
- [ ] 树形表格
- [ ] 虚拟滚动

## 学习资源

- [VXE-Table 官方文档](https://vxetable.cn/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://cn.vitejs.dev/)

## 注意事项

1. TypeScript 类型支持

   - 项目使用 `vue-tsc` 替代 `tsc` 进行类型检查
   - 确保安装了正确的 Volar 插件以支持 `.vue` 文件的类型检查

2. 样式处理
   - 项目使用 SCSS 预处理器
   - 支持 CSS Modules

## 贡献指南

1. Fork 本仓库。
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)
