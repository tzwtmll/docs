import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/': [
    // "/",
    // 侧边栏
    {
      icon: "discover",
      text: "案例",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
      collapsible: true,
    },
    // {
    //   text: "文档",
    //   icon: "note",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // "slides",
    {
      text: '前端',
      icon: '/assets/svg/side/jsLogo.svg',
      prefix: 'frontend/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '后端',
      icon: '/assets/svg/side/backend.svg',
      prefix: 'backend/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '工程化',
      icon: '/assets/svg/side/project.svg',
      prefix: 'engineering/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '数据结构与算法',
      icon: '/assets/svg/side/data.svg',
      prefix: 'dataStructureandAlgorithm/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: '搭建与部署',
      icon: '/assets/svg/side/deploy.svg',
      prefix: 'buildAndDeploy/',
      children: 'structure',
      collapsible: true,
    },
  ],
})
