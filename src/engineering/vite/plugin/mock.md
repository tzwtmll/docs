---
permalink: /vite/plugin/mock
---
# Mock环境的搭建
## 创建文件
```text
├─ dist
├─ mock
│  ├─ index.ts
│  └─ mockProdServer.ts
```
## 安装包
```sh
npm i vite-plugin-mock -D
```
## 文件配置
```js
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig({
  mode: 'mock',
  plugins: [
    viteMockServe({
      mockPath: 'mock'
    })
  ],
  server: {
    port: '9000',
    proxy: {
      '/api': {
        rewrite: (_path) => _path.replace(/^\/api/, '/mock')
      }
    }
  }
})

```
## mock/index.ts
```js
// config/vite.config.mock.js
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/get', //  请求地址
    method: 'get', // 请求方式
    response: ({ query }) => { // 请求参数
      return { // 返回数据
        code: '0',
        data: [1, 2, 3, 4],
        msg: '请求成功'
      }
    }
  },
  {
    url: '/mock/post',
    method: 'post',
    timeout: 100,
    response: ({ body }) => {
      let { id } = body
      return {
        code: 0,
        data: id
      }
    }
  }
] as MockMethod[]
```
## mock/mockProdServer.ts
```js
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import mockModule from './index'
export function setupProdMockServer() {
  createProdMockServer([...mockModule])
}
```
