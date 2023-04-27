import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
export default defineUserConfig({
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/assets/svg/logo.svg' }]],
  lang: 'zh-CN',
  title: 'Docs',
  description: 'Welcome to my docs',
  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: '分类：$content',
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: '标签：$content',
        },
      ],
    }),
  ],
})
