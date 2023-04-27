import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/assets/svg/logo.svg' }]],
  lang: 'zh-CN',
  title: 'Docs',
  description: 'Welcome to my docs',
  theme,
})
