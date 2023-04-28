---
icon: /assets/svg/side/redux.svg
---

# 解析原理与使用 redux

## createStore

- 核心方法
- redux 的三原则,设计核心

(1) 单一数据源,每一个 redux 应用只有一个 store。

(2) state 只读,唯一该改变的方式就是触发 action。

(3) 使用纯函数 reducer 修改 state。

```js
function createStore(reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer必须是函数');

  // 判断 enhancer 有没有传递
  if (typeof enhancer !== 'undefined') {
    // 判断 enhancer 是不是一个函数
    if (typeof enhancer !== 'function') throw new Error('enhancer必须是函数');
    return enhancer(createStore)(reducer, preloadedState);
  }
  // store 对象中存储的状态
  var currentState = preloadedState;
  // 存放订阅者函数
  var currentListeners = [];

  // 获取状态
  function getState() {
    return currentState;
  }
  // 触发 action
  function dispatch(action) {
    // 判断 action 是否是对象
    if (!isPlainObject(action)) throw new Error('action必须是对象');

    // 判断对象中是否具有 type 属性
    if (typeof action.type === 'undefined')
      throw new Error('action对象中必须要有type属性');

    // reducer操作赋值
    currentState = reducer(currentState, action);

    // 循环数组 ，调用订阅者
    currentListeners.forEach((item) => {
      item();
    });
  }

  // 订阅状态 参数为回调函数
  function subscribe(listener) {
    currentListeners.push(listener);
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

::: tip

```js
// 判断 obj 参数是否是对象,createStore中使用的方法
function isPlainObject(obj) {
  // 排除基本数据类型和空
  if (typeof obj !== 'object' || obj === null) return false;
  // 区分数组和对象 原型对象对比的方式
  var proto = obj;
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
```

:::
::: tip

> **p-12**

- 这是 redux 理解的一个难点核心,技术原理是[函数柯里化](/frontend/javascript/currying.md)
  :::

## applyMiddleware

- 创建中间件

- 中间件是 redux 的一个核心方法,在多种库中都有中间件的使用,使用场景主要是 redux 异步请求,redux 缓存等等

- 设计原理非常简单,通过[柯里化](/frontend/javascript/currying.md)和判断类型的方法,来决定使用哪种方式调用 dispatch.

```js
function applyMiddleware(...middlewares) {
  // 使用 扩招运算符和 下面代码意思一致 可以忽略不写，写入作用是提示
  middlewares = [...arguments];
  // 将 createStore 传入进来 applyMiddleware()(createState)
  return function (createStore) {
    // 将 createState 的参数也传入 applyMiddleware()(createState)(reducer,preloadedState)
    return function (reducer, preloadedState) {
      // 创建 store    redux的全部参数都已经传入，组合成 store 对象传出中间件
      var store = createStore(reducer, preloadedState);
      var chain = middlewares.map((middleware) => middleware(store)); // 中间件第一参 store
      // 第一个参数是 中间件们
      // 第二个参数是给 compose 中的返回函数使用 store.dispatch，就是后面dispatch
      // 这里特别重要 dispatch = store.dispatch 这样写的意思是更直观的理解compose中的dispatch
      // var dispatch = compose(...chain)(dispatch) 清晰的写出来
      var dispatch = compose(...chain)((dispatch = store.dispatch));
      return {
        ...store,
        dispatch, // 调用此方法就是中间件第三参 action ，具体实现再 compose
      };
    };
  };
}
function compose(...chain) {
  // 使用意思与 ...funcs一致，可以忽略不写，写入作用是提示
  chain = [...arguments];
  return function (dispatch) {
    // 这里的dispatch，就是上面写入的 store.dispatch,是store的方法
    for (var i = chain.length - 1; i >= 0; i--) {
      // 将 dispatch 方法传入
      dispatch = chain[i](dispatch); // 中间件第二参 dispatch
    }
    return dispatch; // 调用此方法就是传入第三参， action
  };
}
```

::: warning

- 这是 redux 中最难以理解的一个方法,主要是函数[柯里化](/frontend/javascript/currying.md)的使用

```js
// 简单演示
function A(a) {
  return (b) => {
    return (c) => {
      a+b+c===6 ? //这里是否相等
    };
  };
}
A(1)(2)(3);
```

- 这就是柯里化的简单使用方法,可以能有人要问为什么不使用 **A(1,2,3)**
  - 我们这里是不知道 a,b,c 具体值的，而通过柯里化的方法可以知道自己使用的具体方法.
  - 如果你觉得我理解的不对，可以与我讨论,主要是我也不是很理解。

:::

## bindActionCreators

- 这个方法使用的较少,可以作为了解使用

```js
function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {};
  var actionKey = Object.keys(actionCreators);
  actionKey.forEach((item) => {
    var key = item;
    boundActionCreators[key] = () => {
      dispatch(actionCreators[key]());
    };
  });
  // 在这里直接调用 action 也可以完成操作
  return boundActionCreators;
}
```

## combinReducers

- 这个方法是常用的一个语法糖，主要作用是 redux 模块化.
- 其中也使用到了[柯里化](/frontend/javascript/currying.md).

```js
function combinReducers(reducers) {
  // Object.keys 取出key值，存入一个数组 ["user","config"]
  var reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  reducerKeys.forEach((item) => {
    var key = item;
    // 将key作为对于标识存入finalReducers,形成一个新对象方法
    finalReducers[key] = reducers[key];
  });
  const finalReducerKeys = Object.keys(finalReducers);
  return function (state, action) {
    var nextState = {};
    finalReducerKeys.forEach((item) => {
      var key = item;
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      nextState[key] = reducer(previousStateForKey, action);
    });
    return nextState;
  };
}
```

::: tip example

> **_p-1_**

```js
// 方法的使用
combinReducers(reducers);

import userReducer from './user/reducer';
import configReducer from './config/reducer';
let reducers = combinReducers({
  user: userReducer,
  config: configReducer,
});
```

:::

## usage method

::: tip
正在开发中
:::

## Use in react

::: tip
正在开发中
:::
