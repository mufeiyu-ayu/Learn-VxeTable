// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(

  // 基础配置
  {

    vue: true,
    typescript: true,
    formatters: {
      css: true,
      html: true,
    },
    ignores: ['**/*.md', '.cursor', '.husky', 'public', '.cursorignore'],
  },

  // 全局规则
  {
    files: ['**/*{.vue,.js,.ts,}'],
    rules: {
      'no-console': import.meta.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-multi-assign': 'off',
      'ts/no-explicit-any': 'error',
      'ts/max-params': ['error', { max: 3 }],
      'ts/ban-ts-comment': 'off', // 关闭使用ts-ignore
      'ts-ignore': 'off', // 关闭使用ts-ignore
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: [],
        },
      ], // 组件名称在模板中使用帕斯卡命名法
    },

  },

)
