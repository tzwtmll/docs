---
permalink: /interview/index
icon: mianshianpai
---

# 面试题

## 闭包

## 原型

## 防抖

```js
// 假设有一个input搜索框
let inp = document.querySelector('input');
let t = null;
inp.oninput = function () {
  // 如果t不等于null,说明计时器开始了
  if (t !== null) {
    clearTimeout(t);
  }
  t = setTimeout(() => {
    // runTime code
  }, 500);
};
```

- 封装成 hooks

```js
import { useEffect, useRef } from 'react';
const useDebounce = (fn: Function, ms = 100, deps = []) => {
  let timeout = useRef();
  useEffect(() => {
    if (timeot.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  }, deps);
  let cancel = () => {
    clearTimeout(timeout.current);
    timeout = null;
  };
  return [cancel];
};
export default useDebounce;
```

::: tip 使用方法

```js
const [cancel] = useDebounce(
  () => {
    // runTime code
  },
  ms, // 秒数
  [] // 依赖,做一个缓存防止函数允许时间过长
);

// 取消事件
cancel();
```

:::

## 节流

```js
const btn = document.querySelector('button');
let flag = true;
btn.onclick = function () {
  if (flag) {
    setTimeout(() => {
      // runTime code
      flag = true;
    }, 10000);
    flag = false;
  }
};
```

- 封装成 hooks

```js
import { useEffect, useRef, useState } from 'react'
const useThrottle = (fn,ms=100,deps)=>{
    let previous = useRef(0)
    let [time,setTime] = useState(ms)
    useEffect(()=>{
        let now Data.now()
        if(now-previous.current > time){
            fn()
            previous.current = now
        }
    },deps)
    const cancel = ()=>{
        setTime(0)
    }
    return [cancel]
}
export default useThrottle
```

::: tip 使用方法

- 与防抖使用方法一致
  :::

## 倒计时

- 封装 hooks

```js
import { useEffect, useRef } from 'react';
function useSetInterval(callback, delay) {
  // 传入的必须是函数
  if (!(callback instanceof Function)) {
    throw new Error('callback 参数必须是函数！');
  }
  if (!(delay === null || typeof delay === 'number')) {
    throw new Error('delay 必须是 null 或者数字！');
  }
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay === null) {
      return;
    }
    let id = null;
    const tick = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        console.log('come in');
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error('返回值必须是函数');
        }
        clearTimeout(id);
        return;
      }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
export default useSetInterval;
```

::: tip 使用方法

```js
import useSetInterval from '@utils/useSetInterval';

const [count, setCount] = useState(10);
const [delay, setDelay] = useState();
useSetInterval(() => {
  if (count <= 0) {
    return () => {
      // runTime code
      setDelay(null);
      setCount(6);
    };
  }
  setCount(count - 1);
}, delay);
```

:::

## useState 的异步问题

- 在使用**hooks**中的**useState**时会有一个异步问题

```tsx
import { useState } from 'react';

export default function App() {
  const [number, setNumber] = useState(0);
  const addOne = () => {
    setNumber(number + 1);
    // 这里发现总是慢了一步，这会到后续中导致很多问题,弹窗中的重复请求等等
    console.log(number);
  };
  return (
    <div>
      {number}
      <button onClick={addOne}>+1</button>
    </div>
  );
}
```

- 解决方法

1. 使用 useEffect 做一个监听处理

```tsx
import { useState, useEffect } from 'react';

export default function App() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(number);
    // 但是又出现了一个问题,会又多执行了一次
    console.log(number);
    // 这里我们可以再多一层处理
       | |
        V
    if(number){
      // runTime code
    }
    //  但是显然,很不美观,我们需要封装一个同步的useState
  }, [number]);
  const addOne = () => {
    setNumber(number + 1);
  };
  return (
    <div>
      {number}
      <button onClick={addOne}>+1</button>
    </div>
  );
}
```

2. 同步 **useState**

```tsx
import React from 'react';

const isFunction = (setStateAction: any) => {
  return typeof setStateAction === 'function';
};
const useSyncState = (initialState: any) => {
  const _a = React.useState(initialState);
  // 做多次使用处理
  const state = _a[0];
  const setState = _a[1];
  const ref = React.useRef(state);
  // 做缓存处理
  const dispatch = React.useCallback((setStateAction) => {
    ref.current = isFunction(setStateAction)
      ? setStateAction(ref.current)
      : setStateAction;
    setState(ref.current);
  }, []);
  return [state, dispatch, ref];
};

export default useSyncState;
```

::: tip 使用方法

```tsx
import { useState } from 'react';
import { useSyncState } from '@/utils/useSyncState';
export default function Add() {
  const [number, setNumber, ref] = useSyncState<number>(0);
  const addOne = () => {
    setNumber(number + 1);
    console.log(ref.current); // 同步完成
  };
  return (
    <div>
      {number}
      <button onClick={addOne}>+1</button>
    </div>
  );
}
```

:::
