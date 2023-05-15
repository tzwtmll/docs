import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/': [
    // "/",
    // 侧边栏
    // {
    //   icon: "discover",
    //   text: "案例",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    //   collapsible: true,
    // },
    // {
    //   text: "文档",
    //   icon: "note",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // "slides",
    {
      text: '前端',
      icon: 'js',
      prefix: 'frontend/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '后端',
      icon: 'fuwuqi',
      prefix: 'backend/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '工程化',
      icon: 'gongcheng',
      prefix: 'engineering/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '数据结构与算法',
      icon: 'suanfaku',
      prefix: 'dataStructureandAlgorithm/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '搭建与部署',
      icon: 'liuchengbushu',
      prefix: 'buildAndDeploy/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '工具',
      icon: 'gongjuyong',
      prefix: 'tool/',
      children: 'structure',
      collapsible: true,
    },
  ],
})
