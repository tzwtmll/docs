import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  {
    text: '主页',
    icon: 'wxbzhuye',
    link: '/',
  },
  // { text: 'Demo', icon: 'discover', link: '/demo/' },
  {
    text: '指南',
    icon: 'dengpao',
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
    icon: 'js',
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
            icon: 'webpack',
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
            icon: 'typescript-def',
          },
          {
            text: 'React 原理',
            link: '/frontend/react/core.md',
            icon: 'React',
          },
        ],
      },
      {
        text: '状态管理',
        children: [
          {
            text: 'Redux原理',
            link: '/redux/index',
            icon: 'redux-reducer',
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
    icon: 'fuwuqi',
    children: [
      {
        text: 'Nestjs',
        link: '/nestjs/index',
      },
    ],
  },
  {
    text: '数据结构与算法',
    // link: '/dataStructureandAlgorithm/',
    icon: 'suanfaku',
    children: [
      {
        text: '数据结构',
        link: '/dataStructureandAlgorithm/dataStructure',
      },
      {
        text: '算法',
        link: '/dataStructureandAlgorithm/algorithm',
      },
    ],
  },
  // {
  //   text: '关于',
  //   link: '/about',
  //   icon: '/assets/svg/about.svg',
  // },
  {
    text: 'v1.0 文档',
    icon: 'shiyongwendang',
    link: 'https://tzwtmll.github.io/docsv1',
  },
])
