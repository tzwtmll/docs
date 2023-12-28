---
permalink: /nextjs/index
icon: /assets/svg/nextjs.svg
---

# 关于 Nextjs

- The React Framework for the Web

## Nextjs 介绍

> nextjs 路由系统

```text
pages
├── index.js
├── about/index.tsx
└── users/index.tsx

nextjs的路由系统比较有趣，其会根据pages下的文件夹结构自动生成路由，
如上面的文件结构，其会生成以下路由

```

## H5 项目搭建

> 主要是对 H5 项目进行搭建

```bash
npx create-next-app@latest
```

> 我更倾向于 页面路由器 而不是应用程序路由器,所以我会使用 pages 文件

```text
删除 src/app文件
创建 src/pages文件
pages
    ├── _app.tsx    // 根节点
    ├── _documents.tsx // 浏览器窗口
    └── index.tsx //    (/)初始节点
```

> \_app.tsx

```tsx
/**
 * @description 渲染根节点
 */
import type { AppProps } from "next/app";
import "./global.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

> \_documents.tsx

```tsx
/**
 * @description 服务器的初始响应
 */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

> index.tsx

```tsx
/**
 * @description 初始页面
 */
import React from "react";

export default function Page() {
  return <div>index</div>;
}
```

### 环境变量

```bash
pnpm i cross-env  -D
```

> 在项目根目录下创建 .env.js 文件

```json
  "scripts": {
    "dev": "cross-env MODE=local next dev",
    "dev:prod": "cross-env MODE=prod next dev",
  },
```

> .env.js 文件配置

```js
/**
 * @description 环境变量配置
 * @use process.env.xxx
 */
module.exports = {
  local: {
    TARGET_URL: "",
    IMAGE_URL: "",
  },
  prod: {
    TARGET_URL: "",
    IMAGE_URL: "",
  },
};
```

### css 样式配置

```bash
pnpm i sass -D
```

::: danger 注意别安装成 scss 了,我们使用的是 scss 但是安装的是 sass
:::

### H5 移动端适配

- 安装

```bash
# 其中重要的是 amfe-flexible 和 postcss-pxtorem 两个包
# postcss-pxtorem 用于将 px 转换成 rem
# amfe-flexible 用于设置 rem 基准值两者配合使用
pnpm i postcss-flexbugs-fixe postcss-preset-env postcss-pxtorem amfe-flexible  -D
```

> 创建文件

```text
├── postcss.config.js
└── next.config.js
```

> postcss.config.js

```js
/**
 * @description postcss 配置
 */
module.exports = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    },
    "postcss-pxtorem": {
      rootValue: 37.5, //设计稿宽度的1/10
      propList: ["*"],
      selectorBlackList: [".norem"],
    },
  },
};
```

> next.config.js

```js
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
module.exports = nextConfig;
```

::: tip 注意 amfe-flexible 的导入
在 nextjs 中因为是服务端渲染，所以我们需要在\_app.tsx 中导入 且需配置 meta
:::

> \_app.tsx

```tsx
import type { AppProps } from "next/app";
import "./global.css";
import Head from "next/head";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("amfe-flexible");
  }, []);
  return (
    <>
      <Head>
        <meta name="renderer" content="webkit" />
        <title>h5移动端</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

::: tip 恭喜你，你已经完成了 h5 项目的搭建
:::
