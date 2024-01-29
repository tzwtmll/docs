---
permalink: /promise/index
icon: /assets/svg/then.svg
---

# Promise

## Promise 实现的难点

1. 对 Promise 同步异步状态的处理
2. 对 Promise 的链式调用的处理
3. 对 Promise 的值传递的处理
4. 对 Promise 的异常处理

## 源代码

### 使用函数封装

```js
function Promise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;
  const _this = this;
  // 声明一个属性
  this.callbacks = [];
  function resolve(data) {
    // 判断状态【状态只能更改一次】
    if (_this.PromiseState !== "pending") return;
    // 修改状态【成功】
    _this.PromiseState = "fulfilled";
    // 修改结果
    _this.PromiseResult = data;
    // 调用成功的回调函数
    _this.callbacks?.forEach((item) => {
      item.onResolved(data);
    });
  }
  function reject(data) {
    // 判断状态【状态只能更改一次】
    if (_this.PromiseState !== "pending") return;
    // 修改状态【失败】
    _this.PromiseState = "rejected";
    // 修改结果
    _this.PromiseResult = data;
    // 调用失败的回调函数
    _this.callbacks?.forEach((item) => {
      item.onRejected(data);
    });
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    // 捕获 then 中的异常 throw new Error('then error...')
    reject(e);
  }
}

//  then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断then的第二个参数,如何没有传递,就使用默认回调函数，解决值传递问题
  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }
  // 判断then的第一个参数,如何没有传递,就使用默认回调函数，解决值传递问题
  if (typeof onResolved !== "function") {
    onResolved = (value) => value;
  }
  return new Promise((resolve, reject) => {
    const callback = (type) => {
      try {
        let result = type(_this.PromiseResult);
        if (result instanceof Promise) {
          // 接着链式调用
          result.then(
            (s) => {
              resolve(s);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(result);
        }
      } catch (error) {
        // 捕获 then 中的异常 throw new Error('then error...')
        reject(error);
      }
    };
    if (this.PromiseState === "fulfilled") {
      callback(onResolved);
    }
    if (this.PromiseState === "rejected") {
      callback(onRejected);
    }
    // 判断pending状态
    if (this.PromiseState === "pending") {
      // 保存回调函数
      this.callbacks.push({
        onResolved: () => {
          callback(onResolved);
        },
        onRejected: () => {
          callback(onRejected);
        },
      });
    }
  });
};

// catch 方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

// resolve 方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (s) => {
          resolve(s);
        },
        (r) => {
          reject(r);
        }
      );
    } else {
      resolve(value);
    }
  });
};

// reject 方法
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
```

### 使用 class 封装
