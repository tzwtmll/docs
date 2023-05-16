---
permalink: /nestjs/index
icon: nest-service
---

# Nestjs

## 1. 准备

- 安装

```sh
npm i -g @nestjs/cli
```

- 创建项目

```sh
nest new project-name
```

- 命令与快捷命令

```sh
nest g co(controller) mode
nest g s(service) mode
nest g mo(module) mode
# 直接创建文件
nest g res(resource) mode
```

- 安装依赖

```sh
npm i @nestjs/typeorm typeorm mysql2
```

## 2. 语法缩写

```js
constructor(private userService: UserService) {}
this.userService = new UserService()
```

## 3. rest client 调试工具

```js

```

## 4. 参数获取

```js
login(@Request() req)
res.body   {id:1}
res.params /:id
res.query ?id=1

@Get(":id")
login(@Param("id") res)
res.params // 不加("id")
params // id
```

## 5. 控制器

```js
  Request   Headers  HttpCode
 @HttpCode(200)
 fn(@Headers() headers){
     headers
 }

```

## 6. 连接数据库

```js
npm i --save @nestjs/typeorm typeorm  mysql2
```

```js
 imports: [TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: 'root', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'portal', //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体
  })],
```

## 7. 引用实体

```
test.module.ts

import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

imports: [TypeOrmModule.forFeature([Test])],
```

```js
// 在自己的模块中引入
TypeOrmModule.forFeature([Test]
```

### 实体

```js
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm'
@Entity() // ------------------- 各种修饰器需要注意
export class Test {
  @PrimaryGeneratedColumn('uuid') // 自增
  id: number

  @Column({ type: 'varchar', length: 255 }) // 列
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    select: true, // 过滤字段，不被用户可读
    comment: '注释',
    nullable: true, // 能否为空
  })
  password: string

  @Generated() // 自动生成
  uuid: string

  @CreateDateColumn({ type: 'timestamp' }) // 时间戳 自动生成
  createTime: Date

  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  pdd: number

  @Column('simple-array') // 存放数组
  names: string[]

  @Column('simple-json') // 存放 json
  json: { name: string, age: number }
}
```

#### 主列

自动递增的主键

```js
@PrimaryGeneratedColumn()
id:number
```

自动递增 uuid

```
@PrimaryGeneratedColumn("uuid")
id:number
```

列类型

```js
    @Column({type:"varchar",length:200})
    password: string

    @Column({ type: "int"})
    age: number

    @CreateDateColumn({type:"timestamp"})
    create_time:Date
```

自动生成列

```js
@Generated('uuid')
uuid:string
```

枚举列

```js
  @Column({
    type:"enum",
    enum:['1','2','3','4'],
    default:'1'
  })
  xx:string
```

列选项

```js
    @Column({
        type:"varchar",
        name:"ipaaa", //数据库表中的列名
        nullable:true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
        comment:"注释",
        select:true,  //定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
        default:"xxxx", //加数据库级列的DEFAULT值
        primary:false, //将列标记为主要列。 使用方式和@ PrimaryColumn相同。
        update:true, //指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
        collation:"", //定义列排序规则。
    })
    ip:string
```

simple-array 列类型

```js
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('simple-array')
  names: string[]
}
```

`simple-json列类型`

```js
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('simple-json')
  profile: { name: string, nickname: string }
}
```

## 8. 操作实体

### mysql

```js
this.entity.find({}) // 查
this.entity.create({}) // 增
this.entity.update({}) // 删
this.entity.delete({}) // 改
this.entity.sava(data) // 保存
```

```js
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly
     user: Repository<Test>,
  ) {}
  create(createTestDto: CreateTestDto) {
    // 操作数据库
    const data = new Test();
    // 赋值
    data.name = createTestDto.user;
    // 保存
    this.user.save(data);
  }
}
```

## 9. 守卫

```
nest g res guard
在 guard 中
nest g gu role/guard
```

### 控制器守卫

```js
import { RoleGuard } from './role/role.guard';
@UseGuards(RoleGuard)  //导入装饰器
@controller()
```

### 全局守卫

```js
const app = await NestFactory.create(AppModule)
app.useGlobalGuards(new RoleGuard())
```

### 自定义守卫

```js
import {SetMetadata} from '@nestjs/common'
@UseGuards(RoleGuard)

@Get()
@SetMetadata("role",['admin']) //自定义信息
 ['admin']  === this.Reflector.get<string[]>('role', context.getHandler());
```

### 流程

```js
先请求
再拦截
再守卫 先可以到这里 @SetMetadata("role",['admin'])

```

## 10. 自定义装饰器

```
nest g d role
```

```js
import { SetMetadata } from '@nestjs/common';

export const Role = (...args: string[]) => SetMetadata('role', args);

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log(data=params);
    // @ReqUrl("params")
    return req.url;// @Role() url 接受返回值
  },
);
```

```js
@SetMetadata('role', ['admin'])===@Role('admin')
```

## 11. 接口文档 swgger

```
npm i @nestjs/swagger swagger-ui-express
```

### api 说明

```
// 配置 swgger 请求添加token 具有局部 单个 全局几种形式
@ApiBearerAuth('jwt')
@ApiOperation({summary: '登录'})// 描述
```

### 文档创建

```js
main.ts

const swagger = new DocumentBuilder()
  .addBearerAuth() // 全局验证
  .setTitle('pdd博客后台')
  .setDescription('博客后台')
  .setVersion('1.0.0')
  .build()
const document = SwaggerModule.createDocument(app, swagger)
// 地址
SwaggerModule.setup('/api-docs', app, document)
```

### 分组

```js
controller.ts

import { ApiTags，ApiOperation，ApiParam，ApiResponse } from '@nestjs/swagger';
@controller()
@ApiTags('分组名称')
@ApiBearerAuth() //局部验证
@Get()
@ApiOperation({ // 描述
	summary:"get接口",
	description:"描述"
})
@ApiParam({ // 描述动态参数
	name:"id",
	description:"分页信息"
})
@ApiResponse({ //返回信息
	state:"403",
	description:"小黑子"
})
```

### 返回例子

```js
create - guard.dto.ts

import { ApiProperty } from '@nestjs/swagger'
export class CreateGuardDto {
  @ApiProperty({
    example: '达达',
  })
  name: string
  @ApiProperty({
    example: 22,
  })
  age: number
}
```

### 添加权限

```js
//全局添加权限
.addBearerAuth()
```

## 12. jwt(注册>签名>验证)

```js
// 密码加密 passport策略
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

// token验证 jwt策略  //依赖包
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
npm install @types/passport-jwt --save-dev //ts提示

```

##### 包的使用

```js
// 守卫
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('JWT')) // 守卫地点(全局/单个接口)
```

```js
// jwt服务
import { JwtService } from '@nestjs/jwt'
this.JwtService.sign(data) //生成token
this.JwtService.validata(data) // 解析token
```

```js
// 导入模块，注册
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // 自己定义
@Module({
  imports: [
    JwtModule.register({
      secret: 'process.env.SECRET', //密钥
      signOptions: { expiresIn: '1h' },
    }),
  ]，
  providers: [JwtStrategy], // 提供策略

}
```

##### 配置文件

```js
//jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 签发
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //   secretOrKey: process.env.SECRETt, // 为什么不可用
      secretOrKey: jwtConstants.secret,
    })
  }

  // 读取
  async validate(payload: any) {
    return payload
  }
}
```

##### 获取 token 中的信息

```
fn(@Request() req){
	req.user
}
```

#### 配置 jwt 密钥

```js
export const jwtConstants = {
  //加密密钥，不建议明文 .env
  secret: 'secretKey',
}
```

##### passport 策略

```
对用户密码加密"全部人"不可知的策略
```

## 13. 环境配置

```
npm i @nestjs/config
```

### 使用

```js
process.env.xxx // 但是不知道为什么不能再模块之前解析
```

## 14 .文件上传与下载

### 上传

```
npm i @nestjs/platform-express 自带

npm i multer @types/multer
```

```js
//upload.module.ts

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path/posix';

@Module({
  imports: [
    // 注册
    MulterModule.register({
      storage: diskStorage({
        //静态文件，直接可以访问，不要静态文件名 /images.1.ong
        destination: join(__dirname, '../public/images'),
        filename: (_, file, cb) => {
          var fileFlx = file.originalname.split('.')[0];
          var fileExt = file.originalname.split('.')[1];
          cb(null, `${fileFlx}_${Date.now()}.${fileExt}`);
        },
      }),
    }),
  ],
 }
```

```js
import { NestExpressApplication } from '@nestjs/platform-express'

const app = (await NestFactory.create) < NestExpressApplication > AppModule
// 注册静态文件
app.useStaticAssets(join(__dirname, '../public'))
```

### 下载

##### download

```js

// __dirname ,上一级目录文件dir
download(@Res() res) {
    let url = join(__dirname,'../public/images/tp1_1671085852553.png');
    res.download(url);
  }
```

###### 流传输

```js
npm i compressing

  @Get('stream')
  async stream(@Res() res: Response) {
    let url = join(__dirname, '../public/images/tp1_1671085852553.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octer-stream');
    res.setHeader('Content-Disposition', 'attachment=pdd');
    tarStream.pipe(res);
  }
```

前端接收

```js
const res = await fetch(url).then((res) => res.arrayBuffer())
const blob = new Blob([res])
const resurl = URL.createObjectURL(blob) // 生成的地址
```
::: tip 正在开发中
:::