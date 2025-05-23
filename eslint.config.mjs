// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  }, {
    files: ["commitlint.config.js"], // 只对这个文件生效
    languageOptions: {
      globals: {
        ...globals.node, // 引入 Node.js 全局变量
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]