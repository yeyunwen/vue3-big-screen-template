import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  ...pluginVue.configs['flat/essential'],
  // vue规则
  ...vueTsEslintConfig(),
  // 覆盖vue规则
  {
    name: 'app/cover-vue-rules',
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  skipFormatting,
]
