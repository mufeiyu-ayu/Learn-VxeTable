// .lintstagedrc.cjs
const a = 1;
console.log(a);
module.exports = {
  //
  "*.{js,jsx,ts,tsx,vue}": ["eslint --fix"],
};
