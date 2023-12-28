---
icon: xinpian
---

# 算法

## 排序

### 冒泡排序

> 算法的基础是先进行排序，我们先以最简单的冒泡排序来入门

```js
let arr = [5, 3, 1, 2];
arr.forEach((item, index) => {
  if (arr[index] > arr[index + 1]) {
    let temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
  }
});
```

- 我想这一段代码都很熟悉，作为排序的入门，比较数组相邻两项的大小，如果后者比前者大则交换位置，这样一次循环下来，最大的数就会被排到最后面，然后再进行下一轮循环，直到数组排序完成。接下来想要对全部的项进行排序，我们只需要循环执行该项这么多次就能排序成功，再后面就是在此基础上进行数次优化了

```js
arr.forEach((item, index) => {
  arr.forEach((t, i) => {
    if (arr[i] > arr[i + 1]) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
  });
});
```

- 这时我们的排序就完成了

### 选择排序

> 选择排序的思路是找到数组中最小的项，然后将其放在第一位，接着找到第二小的项，将其放在第二位，以此类推，直到数组排序完成，引入了一个类型与指针的概率

```js
let arr = [5, 3, 1, 2];
let min = 0; // 引入min是因为其将其操作的数组抽象成一个，将其操作理解无需数列与有序数列
// 先假设第一项为最小值
arr.forEach((item, index) => {
  min = index;
  arr.forEach((t, i) => {
    i = i + 1; // 自身不需要比较
    if (arr[min] > arr[i]) {
      min = i; // 指针指向最小值
    }
    let temp = arr[index];
    arr[index] = arr[min];
    arr[min] = temp;
  });
});
```

### 插入排序

```js

```
