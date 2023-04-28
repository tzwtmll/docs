---
icon: shezhi
---

# Webpack.config.js 配置

::: tip 学习 webpack 主要学习的就是配置文件，重头戏开始
:::

## entry 入口

- 写入路径是我们开始构建的第一个文件，比如 react 就是从 index 文件开始构建的，因为 index 文件中我们构建了第一个 dom

```js
module.exports = {
  entry: './src/index.js', //指定入口(默认也是这个地址)
}
```

::: tip
我们试着允许一下构建
`npm run build`
![123](/assets/images/error1.jpg)

- 会发现报出这个错误，这是因为现在我们对 react 的环境进行配置，webpack 是不认识`div`这些东西的，接下来我们进行 react 环境配置
  :::

## module 加载 loader

::: tip
这里提一下面试题中经常问到的问题，loader 与 plugin 的区别

- 因为 webpack 只能解析 js 文件，对 css，png，md 等等一些其他文件是无法进行解析的
- 索引我们需要 loader 加载器将文件转化为 webpack 能够解析的内容
- 而 plugin 是提供一种功能

  :::

```js
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 这里与 babel.config.js 作用一样，文件权限更高
            preset: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
}
```

::: tip

- 再次允许 `run run build`发现打包成功了
- 多出一个 dist 文件，就就是我们打包出来的文件
- 现在我们只需在 dist 根目录创建一个 index.html，再使用 live server(vscode 下载插件) 打开即可

```html
<html>
  <body>
    <div id="root"></div>
  </body>
  <!-- 打包后会自动引入index.js 这也是你的入口文件，默认名称为main可以自定义 -->
  <script src="main.js"></script>
</html>
```

![恭喜你成功创建一个react项目](/assets/images/success.jpg)
:::
