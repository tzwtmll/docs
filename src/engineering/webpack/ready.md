---
icon: a-Taskpreparation
---

# Webpack 准备

::: tip 项目是以构建 react 为示例

:::

## 初始化项目与安装脚手架

```sh
npm init -y
```

```sh
npm i webpack webpack-cil webpack-dev-server -D
```

## 安装 react 环境

> 编译环境

```sh
npm i babel-loader @bebal/core @babel/preset-env @babel/preset-react -D
```

> 核心库

```sh
npm i react react-dom -D
```

## 项目格式配置

```sh
npm i eslint-webpack-plugin
```

## 创建目录结构

```text
├─ src
│   └─ index.js
├─ index.html
```

## 写入基本文件配置

> **index.html**

```html
<html>
  <body>
    <div id="root"></div>
  </body>
  <!-- 打包后会自动引入index.js 这也是你的入口文件，默认名称为main可以自定义 -->
  <script src="main.js"></script>
</html>
```

> **scr/index.js**

```js
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<div>hellow webpack</div>)
```

> **webpack.config.js**

```js
/**
 * @type {import("webpack".Configuration)} //vscode提示
 */
module.exports = {}
```

> **package.json**

```json
// 不指定config文件就会默认根目录下的config
{
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
}
```
