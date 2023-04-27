import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  { text: 'Demo', icon: 'discover', link: '/demo/' },
  {
    text: '指南',
    icon: 'creative',
    prefix: '/guide/',
    children: [
      {
        text: 'Bar',
        icon: 'creative',
        prefix: 'bar/',
        children: ['baz', { text: '...', icon: 'more', link: '' }],
      },
      {
        text: 'Foo',
        icon: 'config',
        prefix: 'foo/',
        children: ['ray', { text: '...', icon: 'more', link: '' }],
      },
    ],
    
  },
  {
    text: 'V1 Docs',
    icon: 'note',
    link: 'https://tzwtmll.github.io/docs',
  },
])
