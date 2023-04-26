---
permalink: /webpack/index
---
# 安装

```sh
npm i webpack webpack-cil -D
```

::: tip

**webpack**

- 核心编译工具 对所有的特点功能进行功能支持
- 提供函数导出，将源码给出，直接传参即可

**webpack-cil**

- 脚手架，会提供一些命令行命令，帮助我们更好操作 webpack
- webpack 命令直接调用核心函数的打包功能，降低心智负担 0.0
- state test 等方法，就无需再启动源码
  :::

## 实现功能

- 按需打包
- 分包
- 模块化
- 可观察的依赖包
- 不需要按顺序引入
- 压缩
- 在 es6 没有出来的时候就已经实现模块化 **webpack_require**
- webpack 会产生一个立即执行函数，将 index.js 作为入口，封装到一个立即执行函数里面(立即执行函数不会污染全局作用域)
- treeshaking

> 命令 允许环境

```js
// cli 命令
npx webpack --config server ./config/webpack.dev.js
npx webpack --config ./config/webpack.prod.js
```

```js
  "scripts": {
    "dev":"npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  },
```

# 创建

```js
npm init -y
npx webpack //打包-不指定模式，默认生产模式
npx webpack --mode development //开发模式 自执行
npx webpack --mode production //生产模式
```

```js
dist > index.html >
(
  // npx webpack 打包生成 main.js 被html引入 默认出口 dist
  <script src='main.js'></script>
);
```

# entry

- 具有一个或者多个入口,node 环境服务器允许,只支持 commomjs,导入需要使用 require

```js
/**
 * @type {import("webpack".Configuration)} //vscode提示
 */
module.exports = {
  mode: 'development',
  entry: './src/index.js', //指定入口(默认也是这个地址)
  output: {
    clean: true, //打包前删除 dist目录，后续会有hash，最新的
  },
};
```

```js
//配置方式
1. 单个字符串
react vue spa框架 single page application 单页面应用
入口只有一个，不写也行
2. 多入口
entry: ["./src/a.js", "./src/b.js"],//不推荐，直接引入另一个js
3. 对象main
  entry: {
    main: {
      filename: "pdd.js", // 输出的文件名字
      import: "./src/index.js", // 入口文件
      runtime: "", // 配置当前这个chunk的运行环境
    },
  },

```

# output

```js
  output: {
    clean: true, //打包前删除 dist目录
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
```

# module

```sh
npm i css-loader style-loader less-loader sass-loader -D
css-loader // 导入css
style-loader //创建css
less-loader // 解析 less
sass-loader // 解析 sacc
```

## 处理 css

> test 属性，识别出哪些文件会被转换。

> use 属性，定义出在进行转换时，应该使用哪个 loader。

_生产单独的 css 文件_

`npm install --save-dev mini-css-extract-plugin`

```js
module: {
   rules: [
      {
        test: /\.css$/,
        use: ["style-loader"，"css-loader"],
      }
             {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
```

## 处理图片

```js
 module: {
   rules: [
      {
        test: /\.(jpg)|(png)|(gif)|(webg)|(svg)$/,
        type: "asset", // 图片有内置
        parser: {
          dataUrlCondition: {
            // 小于10k的图片直接转为存储，减少请求次数
            maxSize: 10 * 1024,
          },
        },
        generator:{ // 出口地址
          filename:"static/images/[name]-[hash][ext][query]"
        }
      },
    ],
  },
```

## 处理字体图片音视频等资源

```js
module: {
      {
        test: /\.(tft|woff2?|map3|map4|avi)$/,
        type: "asset", // 不做处理
        generator: {
          filename: "static/media/[name]-[hash][ext]",
        },
     },
}
```

## babel 环境

`npm i babel-loader @bebal/core @babel/preset-env -D`

> 实现语法降级 xml 环境等功能

```js
module: {
	{
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // 下面这段一般是在 .babel 文件中写
          options: {
            preset: ["@babel/preset-dev"],
          },
        },
     },
}
```

> babel.config.js

```js
module.exports = {
  // 智能预设 js语法降级 或者直接继承官方环境
  presets: ['@babel/preset-env'],
};
```

# plugin

### 动态创建 html

`npm i html-webpack-plugin -D`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
module.exports = {
  // 模板
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

### Eslint

`npm i eslint-webpack-plugin`

```js
const EslintPlugin = require('eslint-webpack-plugin');
module.exports = {
  plugins: [
    new EslintPlugin({
      // 检测指定文件 需要有配置文件
      context: path.resoleve(__dirname, 'src'),
    }),
  ],
};
```

### .eslintrc.js

```js
module.exports = {
  // 继承规则即可 或手动配置
  // exports: ["eslint:recommended"],
  env: {
    node: true, //开启node的全部变量  console
    browser: true, // 浏览器全局变量  window
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module', // es模块化
  },
  rules: {
    'no-var': 2, // 不允许使用var
  },
};
```

## 开发服务器

```sh
npm i webpack-dev-server -D
```

> 配置

```js
module.exports={
  devServer: {
    host:"localhost", // 域名
    port: 3000, // 端口
    open:true // 自动打开
  },
}
```

## 开发与生产的区别

- 开发无输出文件，启动服务器即可

# 优化 optimization

## css 压缩

> 首先安装单独生成 css 文件的插件

`npm install --save-dev mini-css-extract-plugin`

> 再安装压缩插件

`npm i css-minimizer-webpack-plugin -D`

> 替换 style-loader ，单独生成 css 文件

```js
const cssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module: {
    // 加载css 默认只加载js
    rules: [
      {
        test: /\.css$/,
        use: [cssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [cssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [cssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
}
plugin:[
    // 配置出口
	new cssExtractPlugin({filename: "static/css/[name]-[hash].css",}),
    ]
  // 优化压缩配置 需要配置 cssExtractPlugin使用
  optimization: {
    minimizer: [new cssMinimizerPlugin()],
  },
```

## js 与 html 默认开启压缩

## sourceMap

> 开发模式
>
> cheap-module-source-map
>
> - 优点 打包编译快，只包含行映射
>
>   直接定位到错误行
>
> - 缺点 没有列映射

```
module.exports={
	mode: "development",
	devtool: "cheap-module-source-map",
}
```

> 生成模式
>
> 只能找到代码，无法再源文件中定位

```
module.exports={
	mode: "development",
	devtool: "source-map",
}
```

## HMR

> 热更新 按需更新 更新 css 不会更新
>
> js 还没有实现

```js
  devServer: {
    host: "localhost", // 域名
    port: 3000, // 端口
    open: true, // 自动打开
    hot: true, // 也是默认值
  },
```

## Oneof

> - 用途
>
>   在配对 loader 后及停止配对

```
 rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [cssExtractPlugin.loader, "css-loader"],
          },
         ]
       }
    ],
```

## cache

- 用途

  > 每次打包都需要走 eslint 和 babel
  >
  > - 需要有一个缓存

#### eslint

```js
new EslintPlugin({
      context: path.resolve(__dirname, "../src"),
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
    }),
```

#### babel

```js
 {
            test: /\.(js|jsx)/,
            include: path.resolve(__dirname, "../src"),
            use: {
              loader: "babel-loader",
              options: {
                // preset: ["@babel/preset-dev"],
                cacheDirectory: true, // 开启缓存压缩
                cacheCompression: false, // 关闭缓存文件
              },
            },
          },
```

# react 环境

> webpack.dev.js

> 安装包

- plugin

`npm i eslint-webpack-plugin html-webpack-plugin -D`

- css

`npm i style-loader css-loader postcss-loader postcss-preset-env sass-loader less-loader -D`

- babel

  `npm i babel-loader @babel/core babel-preset-react-app -D`

  ```js
  不同与上-验证是否成功
  npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D
  // react虚拟dom转化
  npm i babel-plugin-transform-react-remove-prop-types@0.4.24 -D
  ```

- eslint

  `npm i eslint-config-react-app -D`

- webpack

  `npm i webpack-dev-server webpack webpack-cli -D`

- 变量

  `npm i cross-env -D`

> "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js"

- 扩展名识别

> resolve: { extensions: [".jsx", ".js", ".json"],}

- react js 热更新

`npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh`

- 路由懒加载

```js
import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));

<Suspense>
  <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/about' element={<About />}></Route>​{' '}
  </Routes>
</Suspense>;
```

- 路由刷新丢失

> devServer:{
>
> historyApiFallback: true,
>
> }

```js
const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const getStyleLoaders = (pre) => {
  return [
    'style-loader',
    'css-loader',
    {
      // 配合 browserslist 来指定兼容性
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    pre,
  ].filter(Boolean);
};
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: undefined,
    filename: 'static/js/[name].js', //js文件
    chunkFilename: 'static/js/[name].chunk.js', //切割文件
    assetModuleFilename: 'static/media/[hash:10][ext][query]', //静态文件
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders('sass-loader'),
      },
      // 处理图片
      {
        test: /\.(jpg)|(png)|(gif)|(webg)|(svg)$/,
        type: 'asset', // 不做
        parser: {
          dataUrlCondition: {
            // 小于10k的图片直接转为存储，减少请求次数
            maxSize: 10 * 1024,
          },
        },
        // 打包文件名
        generator: {
          filename: 'static/images/[name]-[hash][ext][query]',
        },
      },
      //   处理其他 音视频
      {
        // 处理字体图标，音视频
        test: /\.(tft|woff2?|map3|map4|avi)$/,
        type: 'asset/resource', // 不做处理
        generator: {
          filename: 'static/media/[name]-[hash][ext]',
        },
      },
      // 处理js
      {
        test: /\.(js|jsx)/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            // preset: ["@babel/preset-dev"],
            cacheDirectory: true, // 开启缓存压缩
            cacheCompression: false, // 关闭缓存文件
            plugins: ['react-refresh/babel'], // 激活 react 热更新
          },
        },
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        '../node_module/.cache/.eslintcache'
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    //  react 热更新
    new ReactRefreshWebpackPlugin(),
  ],
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
};
```

> babel.config.js

```js
module.exports = {
  // 智能预设
  presets: ['react-app'],
};
```

> .eslintrc.js

```js
module.exports = {
  // 继承规则即可
  extends: ['react-app'],
  parserOptions: {
    parsets: [
      //   解决页面报错
      ['bebal-preset-react-app', false],
      'babel-preset-react-app/prod',
    ],
  },
};
```

## 生产环境

> 新增 css 打包一个 css 压缩压缩插件

`npm i mini-css-extract-plugin css-minimizer-webpack-plugin -D`

> css 压缩后需要引入内置模块 js 压缩，不然会出现问题
>
> const TerserWebpackPlugin = require("terset-webpack-plugin");
>
> optimization: {
>
> minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
>
> }

- 图片压缩

`npm i image-minimizer-webpack-plugin imagemin -D`

> 无损压缩 (挂梯子)

`npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev`

```js
 const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
   minimizer: [
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  "preset-default",
                  "prefixIds",
                  {
                    name: "sortAttrs",
                    params: {
                      xmInsOrder: "alphabetical",
                    },
                  },
                ],
              },
            ],
          ],
        },
      }),
    ],
```

# 总结完整配置

```sh
 npm init -y
 npm i webpack webpack-cli webpack-dev-server -D
 "start": "webpack-dev-server"
 npm i react react-dom -S
 npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D
 npm i babel-plugin-transform-react-remove-prop-types@0.4.24 -D // 虚拟dom转化
```

> 7. babel 编译

```js
module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        include: path.resolve(__dirname, "../src"),
        use: ["babel-loader"],
      },
    ],
  },
// babel.config.js 文件
module.exports = {
  preset: ["@babel/preset-env", "@babel/preset-react"],
  plugin: ["transform-react-remove-prop-	   types"],
};

```

> 8. html 模板

```js
 npm i html-webpack-plugin -D
 plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(".", "./public/index.html"),
    }),
  ],
```

> 9.  webpack 打包 react

```js
9. const webpack = require("webpack");
  plugins: [
    new webpack.ProvidePlugin({
      React: "react", // vue
    }),
  ],
```

> css 编译

```sh
npm i less-loader sass-loader postcss-loader style-loader css-loader -D
```

> public 中 html 模板需要 id=root