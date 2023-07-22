---
icon: guifan
---

# 代码规范

- 写在前面
  > 我认为每一个程序员都需要有一套自己的代码风格与规范，这能够直接反应一个程序员的技术水平，就像一套制度，它会自动去规范
  > 每个人的行为，使其在一个良好的环境中运作

## 对 React 组件的规范与要求

- 接下来我们实现一个简单的增删改与弹窗的例子书写，规范名称与代码风格，就以新增编辑查看用户作为例子
  > 下面的每一行注释也是规范的一部分 #后面不写，真正的注释

```tsx
// 这里的导入省略,自行导入对应的仓库

// 这里使用枚举类型区分，使内容更加清晰明了
enum UserEnum {
  新增,
  编辑,
  查看
}
export default function Home() {
  // 用户弹窗状态#状态名称以`visible`结尾
  const [userVisible,setUserVisible] = useState(false)
  // 用户弹窗功能
  const [modalMethod,setModalMethod] = useState<UserEnum>(UserEnum.新增)
  // 弹窗操作数据
  const [modalData,setModalData] = useState<Data>({})
  return (
    <div>
      <a onClick=()=>{
          setModalMethod(UserEnum.新增)
      }>新增</a>
        <a onClick=()=>{
          //  #此时在table中存在record
          setModalData(record)
          setModalMethod(UserEnum.编辑)
      }>编辑</a>
        <a onClick=()=>{
          setModalData(record)
          setModalMethod(UserEnum.查看)
      }>新增</a>
      <UserModal
        open={userVisible}
        modalMethod={modalMethod}
        modalData={modalData}
        pageClose={
        ()=>{
          setModalData({})
          setUserVisible(false)
        }
      } />
    </div>
  )
}

interface Props {
  open:boolean
  pageClose:()=>void
  modalMethod:UserEnum
  modalData:Data
}
// 弹窗以Modal结尾
const UserModal = (props:Props) => {
  /**
   * @description 回显
  */
 useEffect(()=>{
  // 其render部分依旧可以通过   props.modalMethod与UserEnum进行区分与展示
  if(props.modalMethod===UserEnum.编辑||props.modalMethod===UserEnum.查看){
     form.setFieldsValue(props.modalData);
  }
 },[props.modalData,props.modalMethod])
  return <Modal open={props.open} onCancel={props.closePage}></Modal>;
}
```

::: tip

- 开始主要是对风格依旧变量命名进行约束
  :::

## 文件目录

```text
.
├── services
│   └── user.ts // 用户相关接口
├── types
│   ├── common.ts // 公共类型
│   ├── user.ts // 用户相关类型
│   └── index.ts  // 全局导出types
```

## types 文件配置

- /types/user.ts
  > eg.这个文件我们导出 user 相关的类型

```ts
export interface Data {
  name: string;
  age: number;
}
```

- /types/index.ts

```ts
export * from ./user
```

- 在此时我们在全局地方就可以只通过一个路径进行导出，这样就形成了一个类型导出规范

```ts
import { Data } from "@/types";
```

## TS 与接口的使用规范

- /types/common.ts
  > 这里依然是在 index 下添加 `export * from "./common"` 即可

```ts
//配置接口返回值的第一层类型
export interface Record<T = any> {
  code: number;
  msg: string;
  data: T;
}
```

- /services/user.ts

```ts
import { Record, Data } from "@/types";
// 这是你封装好的请求方法
import request from "@/request";

// 这样进行一个规范即可，对接口进行了ts配置规范
export getUser = ()=>{
  return request<Record<Data>>("/getUser",{
    method: 'GET',
  })
}
```
