---
permalink: /vite/plugin/router
---

# 动态路由的使用

## 创建文件

```js
├─ src
│  └─ pages
│     └─ router
│        └─ auto.js
```

## 安装包

```sh
npm i vite-plugin-react-router-generator -D
```

## 配置环境

```js
// config/vite.config.dev.js
import { defineConfig } from 'vite';
import ReactRouterGenerator from 'vite-plugin-react-router-generator';

import { resolvePath } from './vite.config.base';
export default defineConfig({
  mode: 'development',
  plugins: [
    ReactRouterGenerator({
      // 这里需要将路径对应
      outputFile: resolvePath('../src/router/auto.js'),
      isLazy: true,
      comKey: 'components',
    }),
  ],
});
```

## auto.js

- 在配置完成后,通过在文件中创建 *route* 对象，脚本就会自动将信息导入到 auto.js 文件中

## example

```js
function Home() {
  return <div>home</div>;
}
export default Home;
Home.route = {
  path: '/list/home',
  label: '主页',
  parentkey: '/list',
};
```
