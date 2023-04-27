import { defineUserConfig } from 'vuepress';
import theme from './theme.js';

export default defineUserConfig({
  base: '/docs/',
  lang: 'zh-CN',
  title: 'Docs',
  description: 'Welcome to my docs',
  theme,
});
