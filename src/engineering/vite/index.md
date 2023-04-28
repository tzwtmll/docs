---
permalink: /vite/index
icon: /assets/svg/vite.svg
---

# Vite 构建项目

## 初始化文件

```sh
npm init -y
npm i vite -D
```

### 目录结构

```txt
├─ config
│  ├─ vite.config.base.js
│  ├─ vite.config.dev.js
│  ├─ vite.config.mock.js
│  └─ vite.config.prod.js
├─ mock
│  ├─ index.ts
│  └─ mockProdServer.ts
├─ src
│  ├─ asset
│  │  └─ global.less
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ vite-env-d.ts
│  └─ theme
│     └─ var.less
├─ .eslintrc.js
├─ .env.development
├─ .env.production
├─ .prettierrc.js
├─ .gitignore
├─ .stylelint.js
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.js
```

<!-- details -->

::: tip 文件说明

- _config_

一般是存放配置文件的地方，其中主要配置文件包括生成环境配置,开发环境配置,公共环境配置。

- _mock_

在项目刚刚起步时，配置的假数据。

- _src_

代码编写主体

- .eslintrc.js

eslint 配置文件,检查代码规范，统一代码风格,提示代码错误。

- .prettierrc.js

文件格式化配置,统一代码风格，防止出现 git 冲突，减少交流成本

- tsconfig.json

ts 环境文件配置

- vite.config.js

根配置环境
:::

## 配置 .eslintrc.js

### 安装包

```sh
// 官方类型需要第一安装。 这是我找到的兼容版本,他兼容eslint@7.32.0
npm i eslint-config-standard-with-typescript --save-dev
npm i eslint@7.32.0 --save-dev // 兼容版本

npm i eslint-plugin-import --save-dev
npm i eslint-config-prettier --save-dev
npm i eslint-plugin-import --save-dev
npm i eslint-plugin-jsx-a11y --save-dev
npm i eslint-plugin-react --save-dev
npm i eslint-plugin-simple-import-sort --save-dev
```

::: tip 版本兼容

### 按顺序安装

```sh
npm i eslint-config-standard-with-typescript --save-dev
| |
 V
npm i eslint@7.32.0 --save-dev
```

- [如果你有更好的兼容版本可以与我交流](/about/index.md)

:::

### 文件配置

```js
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': [1, {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 1, //导入顺序
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      //是否必须标签化
      0,
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 0, // 点击添加键盘监听
    'jsx-a11y/no-static-element-interactions': 0, // a 标签添加关联
    // 'jsx-a11y/rule-name': 1,
    'no-unused-vars': 1,
    'no-var': 1,
    '@typescript-eslint/no-explicit-any': 0, // 是否可以使用 any
    'prefer-const': 0, // 是否使用const
  },
};
```

## 配置 .prettierrc.js

### 文件配置

```js
// .prettierrc.js
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 80,
  // 一个tab代表几个空格数，默认为80
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: false,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true,
  // 默认格式化工具选择prettier
};
```

::: tip

- 如果配置未生效，首先尝试重启 vscode。如果依然不成功
- 打开设置>setting.json>
  {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  }
  :::

## 配置 .stylelintrc.js

### 安装包

```sh
npm i stylelint --save-dev
npm i stylelint-config-standard --save-dev
npm i stylelint-config-recess-order --save-dev
```

### 配置文件

```js
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
  ],
  rules: {
    indentation: null, // 指定缩进空格
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'string-quotes': 'double', // 指定字符串使用单引号或双引号
    'unit-case': null, // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
    'color-hex-case': 'lower', // 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)"
    'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    'rule-empty-line-before': 'never', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
    'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
    'block-opening-brace-space-before': 'always', // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'no-empty-source': null, // 禁止空源码
    'declaration-block-trailing-semicolon': null, // 要求或不允许在声明块中使用尾随分号 string："always(必须始终有一个尾随分号)"|"never(不得有尾随分号)"
    'selector-class-pattern': null, // 强制选择器类名的格式
    'value-no-vendor-prefix': null, // 关闭 vendor-prefix(为了解决多行省略 -webkit-box)
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
  },
};
```

::: tip

```js
// 配置package.json文件
{
  "scripts": {
    "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx --fix ./src",
    "lint:style": "stylelint --fix \"**/*.(less|css)\" "
},
```

:::

## 配置 vite 环境文件

### vite.config.js

```js
// defineConfig 字段提示
import { defineConfig } from 'vite';
import viteBase from './config/vite.config.base';
import viteDev from './config/vite.config.dev';
import viteMock from './config/vite.config.mock';
import viteProd from './config/vite.config.prod';

// 通过 mode 区分环境 --mode env 指定环境，需要返回函数
const configEnv = {
  development: () => Object.assign(viteBase, viteDev),
  production: () => Object.assign(viteBase, viteProd),
  mock: () => Object.assign(viteBase, viteMock),
};

export default defineConfig(({ mode }) => {
  return configEnv[mode]();
});
```

- 根配置文件,通过`--mode`区分启动环境，mode 状态通过`defineConfig`中参数获得,再将
  config 中配置好的文件进行整合,通过 mode 调用不同的环境启动项目

### vite.config.base.js

#### 安装公共环境包

```sh
// react编译
npm i @vitejs/plugin-react -D
// ts浏览器检索
npm i vite-plugin-checker -D
// gzip压缩
npm i vite-plugin-compression -D
// 压缩可视化
npm i vite-plugin-progress -D
// 样式按需导入
npm i vite-plugin-style-import -D
// ts路径映射
npm i vite-tsconfig-paths -D
```

#### 公共环境配置

```js
// config/vite.config.base.js
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import progress from 'vite-plugin-progress';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import tsconfigPaths from 'vite-tsconfig-paths';
// 相对路径转绝对路径，因为是node环境，可能文件执行位置发送改变
export const resolvePath = (_path) => resolve(__dirname, _path);
// antd按需导入
function AntdLibImport() {
  return {
    libraryName: 'antd',
    esModule: true,
    resolveStyle: (name) => {
      return `antd/es/${name}/style/index`;
    },
  };
}
export default defineConfig({
  plugins: [
    react(),
    progress(),
    checker({ typescript: true }),
    tsconfigPaths(),
    createStyleImportPlugin({ libs: [AntdLibImport()] }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    // 别名配置 tsconfig.json文件中还需要配置
    alias: {
      '@': resolvePath('../src'),
      '~': resolvePath('../node_modules'),
    },
    // 接收模块后缀
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.less',
      '.svg',
    ],
  },
  define: {
    MENU_PATH: `"path"`,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
        math: 'always',
        devSourcemap: true, //定位到源文件中
        // 全局导入
        additionalData: `@import "${resolvePath('../src/theme/var.less')}";`,
      },
    },
  },
});
```

```js
// 别名配置在ts环境中还需要再 tsconfig.json中进行配置
{
  compilerOptions:{
    "baseUrl": ".",
    "paths": {
    "@/*": ["src/*"],
    "~/*": ["node_module/*"]
}
}
```

### vite.config.dev.js

#### 安装开发环境包

```sh
// html模板
npm i createHtmlPlugin -D
// 动态路由
npm i vite-plugin-react-router-generator -D
```

::: tip
[动态路由的使用](/vite/plugin/router)
:::

#### 文件配置

```js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import ReactRouterGenerator from 'vite-plugin-react-router-generator';

import { resolvePath } from './vite.config.base';
export default defineConfig({
  mode: 'development',
  plugins: [
    ReactRouterGenerator({
      outputFile: resolvePath('../src/router/auto.js'),
      isLazy: true,
      comKey: 'components',
    }),
    createHtmlPlugin({
      inject: {
        // 导入到 html 中的变量
        data: {},
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'localhost:3000', //代理地址
        rewrite: (_path) => _path.replace(/^\/api/, '/onLine'), // 选择替换api
      },
    },
  },
});
```

<!-- 生产环境 -->

### vite.config.prod.js

#### 安装生产环境包

```sh
// hash
npm i hash.js -D
```

#### 文件配置

```js
import createHash from 'hash.js';
import { defineConfig, version } from 'vite';

import { resolvePath } from './vite.config.base';
export default defineConfig({
  mode: 'production',
  build: {
    rollupOptions: {
      input: {
        index: resolvePath('../index.html'),
        app: resolvePath('../src/main.tsx'),
      },
      output: {
        // 静态资源
        assetFileNames: (assetInfo) => {
          let extType = assetInfo?.name.split('.')[1] ?? '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
        // 入口文件
        entryFileNames: (chunk) => {
          if (chunk.name === 'app') {
            return `static/js/[name].${version}.js`;
          }
          return `static/js/[name].js`;
        },
        // chunk
        chunkFileNames: (chunkInfo) => {
          const hash = createHash
            .sha256()
            .update(Object.values(chunkInfo.moduleIds).join())
            .digest('hex')
            // 取5位
            .substring(0, 5);
          return `static/js/${hash}.chunk.js`;
        },
      },
    },
  },
});
```

### vite.config.mock.js

#### 安装 mock 环境包

```sh
npm i vite-plugin-mock -D
```

```js
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
export default defineConfig({
  mode: 'mock',
  plugins: [
    viteMockServe({
      mockPath: 'mock',
    }),
  ],
  server: {
    port: '9000',
    proxy: {
      '/api': {
        rewrite: (_path) => _path.replace(/^\/api/, '/mock'),
      },
    },
  },
});
```

::: tip
[配置 mock 环境](/vite/plugin/mock)
:::

## Plugin 的使用说明

- 包括但不仅有

## package.json 文件

```json
  "scripts": {
    "start": "npm run dev ",
    "dev": "vite",
    "build": "tsc && vite build",
    "mock": "vite --mode mock",
    "preview": "vite preview --port 10001",
    "lint:fix": "eslint --ext .js,.jsx,.ts,.tsx --fix ./src",
    "lint:style": "stylelint --fix \"**/*.(less|css)\" "
  },
```

## react 项目创建

```text
├─ src
│  ├─ App.tsx
│  ├─ main.tsx
```

### App.tsx

```js
import React from 'react';

export default function App() {
  return <div>app</div>;
}
```

### main.tsx

```js
import '@/assets/css/global.less';
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pdd</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
```
