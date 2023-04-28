---
permalink: /react/core
icon: /assets/svg/side/react.svg
---

# React 框架原理

## Virtual dom

- 虚拟 dom

  - 学习原理原理先要了解一个虚拟 dom 的核心概念

  1. 什么是虚拟 dom
  2. 为什么要使用虚拟 dom,他有什么好处

> example

```jsx
let element = <div>内容</div>;
```

- 在普通的 js 文件能否识别这种语法?很显然是不能的,但是在` jsx 文件`中是能
  够使用这种语法的,这是因为是 react 提供这种环境,提供了能将标签转化为`虚拟dom`的能力。

- 在经过虚拟 dom 转化后,会形成一个普通的 js 对象,后续我们操作这个 js 对象,
  最后完成真实 dom 的转化

```js
// 在完成转化后,生成此类结构
{
  type: 'div',
  props:{
    children:"内容"
  }
}
```

```sh
npm i react-dom -D
```

```jsx
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(App);
```

- 有没有觉得这段代码很熟悉？是的，他正是提供虚拟 dom 转化的库,再挂载根节点以后，
  执行他的方法`render`渲染页面
- 而我们需要学习的正是`render`方法,他是如果将虚拟 dom 转化成为真实 dom 的.这个
  流程也就是我们需要学习的，也正是 react 的核心`fiber架构`
- 在此,我们简化流程,自己创建虚拟 dom

## createElement

- 先写一个转化`虚拟 dom`的函数

```js
function createElement(type, props, ...children) {
  //  返回一个js对象，也就是虚拟dom
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        // 对children的类型进行判断，是对象说明还有深层次,一直递归到文本为止
        if (Object.prototype.toString.call(child) === '[object Object]') {
          return child;
        } else {
          return createTextElement(child);
        }
      }),
    },
  };
}
function createTextElement(text) {
  return {
    // 保存格式的一致性
    type: 'TEXT-ELEMENT',
    props: {
      nodeValue: text, //将文本以对象的形式展示出来
      children: [],
    },
  };
}
export default createElement;
```

::: tip
正在开发中
:::
