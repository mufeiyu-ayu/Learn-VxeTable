import antfu from '@antfu/eslint-config'

export default antfu(
  {},
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
  {
    files: ['**/*.cjs'],
    rules: {
      'quotes': ['off', 'single'],
      // 允许字符串使用反引号
      'quotes-props': ['off', 'consistent-as-needed'],

    },
  },
)
