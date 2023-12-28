---
# icon: /assets/svg/side/structure.svg
icon: shujujiegou-01
tag:
  - Icon
---

# 数据结构

- 可能在前端平时的工作中，很难使用数据结构与算法，但是可以作为技术储备，对后续晋升发展有帮助

## 链表

### 单向链表

- 单向链表较为简单，主要是熟悉最基本的`javascript数组[]`数据结构
  ::: tip 与 js 数组有何种区别？

1.  在 javascript 中，比如我们使用`pop`或`shift`对数组第一项进行了处理，其实第一项是被空缺了，接下来再由 javascript 将每一项都向前或向后移动一位，在我们看来是没有任何异常的，这是由 v8 引擎以及现代 cpu 的强大算力实现，假如如果数据量异常巨大可能就会导致程序缓慢。这时数据结构的作用就出来了
2.  数据结构能够使程序更加快速，比如`react17`发布的[fiber 数据结构](/frontend/react/core.md#diff)
    ![Fiber](/fiber.webp)
    :::

```js
// 创建一个calss，为后续实例准备
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
// 单链
class LinkedList {
  constructor() {
    // 索引
    this.count = 0;
    // 第一项
    this.head = null;
  }
  // 添加元素-方法
  push(element) {
    // 实例化一个对象
    const node = new Node(element);
    // 第一项
    if (this.head === null) {
      this.head = node;
    } else {
      // 作一下命名处理，便于理解
      let current = this.head;
      // 第二项以后就拼接在前一项的结尾
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    // 添加索引
    this.count++;
  }
}
```

### 二叉搜索树

```js

```

::: tip 正在开发中。。。
:::
