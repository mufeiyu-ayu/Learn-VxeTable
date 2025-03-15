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
    ignores: ['**/*.md'],
  },

  // 全局规则
  {
    files: ['**/*{.vue,.js,.ts,}'],
    rules: {
      'no-console': 'off',
      'no-multi-assign': 'off',
      'ts/no-explicit-any': 'error',
      'ts/max-params': ['error', { max: 3 }],
      'ts/ban-ts-comment': 'off',
      'ts-ignore': 'off',
    },

  },

)
