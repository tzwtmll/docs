---
permalink: /react/core
icon: React
---

# React 框架原理

- [React 完整代码](code.md)
- [Build your own React](https://pomb.us/build-your-own-react/)

## Virtual dom

::: tip 虚拟 DOM

- 这是 react 的 `jsx` 所带来的概念，这是一个非常重要的概念，虚拟 DOM

```js
let element = <div>app</div>;
/**
 * @description 这段代码 js 之所以是能够编译，是以为`react-dom`提供的 babel 环境将其编译,这段代码会被转化成一个 js 对象，再经过一些代码的运作就可以渲染到浏览器
 */
let Vdom = {
  type: '',
  props: {},
};
```

:::

## createElement

- 我们需要首先有一个虚拟 DOM 的对象，才能进行下一步操作

```js
// 现在只创建一个简单的dom
const element = createElement(
  /**
   * @description 它的html标签
   * @param  type
   */
  'h1',
  /**
   * @description 它的属性，事件，类名等
   * @param props
   * @replenish 暂不添加props
   */
  null,
  //-------------下面则是children:[{},{}]的两个元素------------------
  /**
   * @description 它的子元素
   * @param children
   */
  'hello'
  /**
   * @description 它的子元素
   */
  createElement(
    "p",
    null, // 暂时不添加方法
    "world"
  )
)
```

```js
const element = createElement(
  'h1',
  null,
  'hello',
  createElement(
    'p',
    null, // 暂时不添加方法
    'world'
  )
);
/**
 * @description 上面的代码被转化为这了这段虚拟dom，接下来就重头戏就开始了
 我们后续的代码都围绕一段虚拟dom展开
 */
const VDOM = {
  type: 'h1',
  props: {
    children: [
      {
        type: 'TEXT-ELEMENT',
        props: {
          ondeValue: 'hello',
          children: [],
        },
      },
      {
        type: 'p',
        props: {
          children: [
            {
              type: 'TEXT-ELEMENT',
              props: {
                ondeValue: 'world',
                children: [],
              },
            },
          ],
        },
      },
    ],
  },
};
```

## render

```js
const element = createElement(
  'h1',
  null,
  'hello',
  createElement(
    'p',
    null, // 暂时不添加方法
    'world'
  )
);
render(element, document.getElementById('root'));
// 从这里开始
let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;
/**
 * @desciption 开始
 */
function render(element, container) {
  // 构建根节点
  wipRoot = {
    /**
     * @description 需要挂载的真实dom
     */
    dom: container,
    /**
     * @description 自身属性
     */
    props: {
      children: [element],
    },
    /**
     * @description 子节点
     */
    child: null,
    /**
     * @description 兄弟节点
     */
    sibling: null,
    /**
     * @description 父节点
     */
    parent: null,
    /**
     * @description 一颗完整的DOM树
     */
    alternate: currentRoot,
  };
  deletions = []; // 垃圾桶
  /**
   * @description 赋值之后就开始构建了
   */
  nextUnitOfWork = wipRoot;
}
/**
 * @description 浏览器自带方法，浏览器会不停调用该方法，会将空闲时间传入
 我们直接启动这个函数
 * @补充 这个是一切递归的开始
 */
requestIdleCallback(workLoop);
```

##

```js
/**
 * @description fiber加工厂
 */
function workLoop(deadline) {
  /**
   * @description nextUnitOfWork有材料时且空闲时间大于1，开始加工
   */
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 因为下面一直再递归请求，所以我们需要关掉这个循环
    // nextUnitOfWork有执行完的时候，到最后是 返回 undefined，
    // 但是 wipRoot 是存在是实例，需要手动关闭 令 wipFiber = null
    commitRoot();
  }
  requestIdleCallback(workLoop); //请求空闲时间
}
```

## performUnitOfWork

```js
/**
 * @description 车间一
 */
function performUnitOfWork(fiber) {
  /**
   * @description 为每个fiber节点-创建真实DOM，根据自己属性
   * @replenish  排除根节点，因为根节点本身就是真实DOM
   */
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  // 处理 fiber 之间的关系
  reconcileChildren(fiber, fiber.props.children);
  // 优先级问题,有子找子，无子找兄弟，再找父的兄弟
  if (fiber.child) {
    return fiber.child;
  }
  //到这个地方来了，就是子已经找完了，现在就是从最后一个儿子的兄弟把上开始找，找父的兄弟
  /**
   * @description 走过了 if (fiber.child) 那就是走到节点尽头，最后一个子节点了 fiber 现在就是最后一个子节点，现在需要找的就是 fiber 的兄弟节点
   */
  var nextFiber = fiber;
  if (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    /**
     * @description 这里是兄弟节点也找到头了，现在的fiber就是最边缘的那个，他已经`无兄无子`了，
     */
    nextFiber = nextFiber.parent;
  }
}
```

## createDOM

```js
/**
 * @description 构建真实DOM
 */
function createDOM(fiber) {
  const dom =
    fiber.type == 'TEXT-ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  Object.keys(fiber.props)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      dom[key] = fiber.props[key];
    });
  return dom;
}
```

## reconcileChildren

```js
/**
 * @description
 * @param fiber
 * @param fiber.props.children
 */
function reconcileChildren(wipFiber, elements) {
  /**
   * @description 索引，为了递归拿去 children中的数据
   */
  let index = 0;
  let preSibling = null;
  /**
   * @descritpion 发送在DOM更新后，可以使用缓存
   */
  let oldFiber = WipFiber.alternate && WipFiber.alternate.child;
  while (index < elements.length || oldFiber) {
    let element = elements[index];
    let sameType = oldFiber && element && oldFiber == element.type;
    let newFiber = null;
    /**
     * @description 有缓存且type未改变，整齐dom结构未变，这是props改变
     我们就不用构建整个dom
     */
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        // 继承dom
        parent: wipFiber,
        child: null,
        sibling: null,
        alternate: oldFiber, //依旧继承
        effectTag: 'UPDATE',
      };
    }
    /**
     * @description type改变，新建，-不管是第一次，还是更新,所以不考虑oldFiber是否有缓存
     */
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        // 与父fiber关联
        parent: wipFiber,
        dom: null, // 没用缓存，构建dom
        child: null,
        sibling: null,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }
    /**
     * @description 删除，有缓存，但是type不一样
     */
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    /**
     * @description 构建下级fiber，因为再更新后，原来的结构需要重构，但是上级结构是完好的
     */
    if (oldFiber) {
      /**
       * @description 因为只有一个儿子，再找其他儿子需要以儿子的兄弟的身份找
       * @补充 因为我们开始构建时就是 一夫一子一兄的关系，不需要在做其他的操作
       */
      oldFiber = oldFiber.sibling;
    }
    /**
     * @description 第一个儿子为子节点，第二个儿子作为第一子节点的兄弟的节点，本节点(也就是他们的父节点)不与第二个儿子建立关系
     */
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (index > 0) {
      prevSibling.sibling = newFiber;
    }
    /**
     * @description 我详细描述一下，这里可能有一点不好懂
     * @param {index===0} 这是父节点与子建立关系字节 p74，再将子节点暂存为上一次兄弟节点 prevSibling = newFiber，为等会连接第二个儿子节点作铺垫，这个很好理解
     * @param {index>0} 现在的newFiber是第二个儿子，我们现在手上已经拥有第一个儿子节点，我们现在只需将newFiber挂载到 prevSibling.sibling 即可
     */
    prevSibling = newFiber;
    index++;
  }
}
```

![这是fiber运行的方式，当type不同时先添加最新的，再删除以前的，而不是找到再修改](/delect.jpg)

## Fiber

![Fiber](/fiber.webp)

- 他是由**父子兄**三种节点组成，主要的设计理念就是一个`父亲只有一个儿子`，对于`第二个子节点`，`父节点`不与其建立关系，将其作为自己`子节点`的`兄弟节点`，而第二个子节点是不认识`第一个子节点的`，他只能识别`父节点`，这样做的好处是每一个节点都做到了一 一对应的关系，不存在任意一种节点对应相同类型的两个节点。总结就是**一父一子一兄**

::: tip
正在开发中
:::
