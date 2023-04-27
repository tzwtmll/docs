import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  { text: '案例', icon: 'discover', link: '/demo/' },
  {
    text: '指南',
    icon: 'creative',
    prefix: 'guide/',
    link: '/guide',
    // children: [
    //   {
    //     text: 'Bar',
    //     icon: 'creative',
    //     prefix: 'bar/',
    //     children: ['baz', { text: '...', icon: 'more', link: '' }],
    //   },
    //   {
    //     text: 'Foo',
    //     icon: 'config',
    //     prefix: 'foo/',
    //     children: ['ray', { text: '...', icon: 'more', link: '' }],
    //   },
    // ],
  },
  {
    text: '前端',
    icon: '/assets/svg/jsLogo.svg',
    children: [
      {
        text: 'Vite',
        children: [
          {
            text: 'vite搭建框架',
            link: '/vite/index',
            icon: '/assets/svg/vite.svg',
          },
          {
            text: 'mock的使用',
            link: '/vite/plugin/mock',
          },
          {
            text: '动态路由的使用',
            link: '/vite/plugin/router',
          },
        ],
      },
      {
        text: 'Webpack',
        children: [
          {
            text: 'webpack的使用',
            link: '/webpack/index',
            icon: '/assets/svg/webpack.svg',
          },
        ],
      },
      {
        text: 'Javascript模块',
        children: [
          { text: '函数柯里化', link: '/javascript/currying' },
          {
            text: '面试题',
            link: '/interview/index',
          },
          {
            text: 'typescript 的使用',
            link: '/frontend/typescript',
            icon: '/assets/svg/ts.svg',
          },
          {
            text: 'React 原理',
            link: '/frontend/react/core.md',
            icon: '/assets/svg/react.svg',
          },
        ],
      },
      {
        text: '状态管理',
        children: [
          {
            text: 'Redux原理',
            link: '/redux/index',
            icon: '/assets/svg/redux.svg',
          },
        ],
      },
      // {
      //   text: 'Css',
      //   link: '/css/index',
      // },
    ],
  },
  {
    text: '后端',
    icon: '/assets/svg/backend.svg',
    children: [
      {
        text: 'Nestjs',
        link: '/nestjs/index',
      },
    ],
  },
  {
    text: '数据结构与算法',
    link: '/dataStructureandAlgorithm/',
    icon: '/assets/svg/data.svg',
  },
  {
    text: '关于',
    link: '/about',
    icon: '/assets/svg/about.svg',
  },
  {
    text: 'V1 文档',
    icon: 'note',
    link: 'https://tzwtmll.github.io/docsv1',
  },
])
