import { defineUserConfig } from 'vuepress';
import theme from './theme.js';

export default defineUserConfig({
  base: '/v2docs/',
  lang: 'zh-CN',
  title: '技术文档',
  description: 'Welcome to my docs',
  theme,
});
