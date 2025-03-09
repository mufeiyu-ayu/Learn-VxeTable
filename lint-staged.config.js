// .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx,vue}': [
    // 先检查是否有错误
    files => `eslint --max-warnings=0 ${files.join(' ')}`,
    // 如果没有错误，再进行修复
    files => `eslint --fix ${files.join(' ')}`,
  ],
}
