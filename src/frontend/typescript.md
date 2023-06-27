---
icon: typescript-def
---

# Typescript

- 在 `ts` 中大写分别有什么作用?
  以`String`和`string`举例,前者是`js`提供类型,后者是`ts`提供类型,`String`包含`string`,平时写建议统一小写,`使用ts规范`

### 数据类型

---

```ts
let str: string = "pdd";
let num: number = "123";
let strArr: string[] = ["P", "D", "D"];
let numArr: number[] = [4, 5, 6];
// 对象有三种书写方式
let strObj1: {
  str: string;
  num: number;
} = { str: "pdd", num: 123 };
type Data = {
  str: string;
  num: number;
};
let strObj2: Data = { str: "pdd", num: 123 };
interface Data {
  str: string;
  num: number;
}
let strObj3: Data = { str: "pdd", num: 123 };
```

::: tip 小知识点

- `type`与`interface`使用方法一致,interface 在于可以继承

```ts
interface A {
  name: string;
}
interface B extends A {
  age: number;
}
let people: B = {
  name: "pdd",
  age: 24,
};
```

- 各种符号的使用

```ts
interface Data {
  str?: string; // 表示可选
  [keyName: any]: any; // 表示可以有其它类型包括所有
  [key: string]: string; // 表示键为string值为string
}
[]; // 添加 [] 表示为数组对象 [{}]
```

:::

## ts 语法

---

- 主要包括 [泛型](#泛型) , [typeof](#typeof) , [keyof](#keyof)的使用

### 泛型

- 泛型就是 ts 的类型的参数,类似函数的参数.泛型符号一般由 T,U 等表示,没有本质意义,就是一个符号,主要是 Type 的首字符 T

```ts
// ----example-----
function Fn(string) {
  console.log(string);
}
Fn("pdd");
// -----------
interface Data<T> {
  name: T;
}
let str: Data<string> = {
  name: "pdd",
};
```

### typeof

- typeof 主要是起到一个辅助作用,帮助我们少写代码,需要对`对象(包括函数)`使用.

```ts
let obj = {
  name: "pdd",
  age: 24,
};
type A = typeof obj;
interface B {
  data: typeof obj;
}
let obj1: A = {
  name: "pp",
  age: 5,
};
let obj2: B = {
  data: {
    name: "yy",
    age: 3,
  },
};
// 对函数使用也是一样
function fn() {
  return {
    name: "pdd",
    age: 24,
  };
}
type A = typeof fn;
const f: A = () => ({
  name: "PP",
  age: 5,
});
```

### keyof

- keyof 需要对 ts 类型使用,生成由 string 或者 number 组成的联合字面量类型。

```ts
type A = {
  name: string;
  age: number;
};
type B = keyof A; //  B = 'name' | 'age'
// 只能使用 name 或者 age
const key1: B = "name";
const key2: B = "age";
```

::: tip 最常见使用

- 配合泛型
  > 此种方法在 js 库中使用的较多,主要是约束了参数的范围

```ts
export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

const person = {
  name: "CJ",
  age: 18,
};
console.log(getProperty(person, "name"));
```

- 配合映射类型
  > keyof 运算符的另一个常见用途是映射类型，通过遍历键将现有类型转换为新类型。

```ts
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

// 相当于
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };
```

- in 循环

```ts
type A = {
   name:"pdd"
   age:12
}
interface B {
[T in keyof A] : any
}
// 此处已经只取了 keyName 而其类型已被重写为 any
let obj:B ={
    name:123123,
    age:123123
}
```

:::

## Pick Omit Partial

```ts
interface People {
  name: string;
  age: number;
  grade: number;
}
// 选择一个接口的部分属性 Pick
interface A extends Pick<People, "age"> {}
let a: A = {
  age: 1,
};
// 排除一个接口的部分属性 Omit
interface B extends Omit<People, "age"> {}
let b: B = {
  name: "1",
  grade: 1,
};
// 选择一个接口的全部属性定义为可选 Partial
interface C extends Partial<People> {}
let c: C = {
  name: "1",
  age: 1,
  // grade: 1 此时可不选
};
/**
 * @description 实现 Pick Omit Partial
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;
type MyNonNullable<T> = T extends null | undefined ? never : T;
```

:::tip 正在持续开发中
:::
