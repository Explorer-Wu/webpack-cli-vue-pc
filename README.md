# webpack-cli-vue-pc
> Webpack-cli构建PC端Vue单页面应用模版

## Available Scripts
In the project directory, you can run:

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 
* 公共库或代码打包
```sh
    npm run dlllibs / yarn dlllibs
``` 
* 开发环境服务启动
```sh
    npm run start / yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3603](http://localhost:3603) to view it in the browser.

### 测试
* run unit tests
```sh
    npm run unit / yarn unit
```
* run e2e tests
```sh
    npm run e2e / yarn e2e
```
* run all tests
```sh
    npm run test / yarn test
```

获取mock.js测试模拟后端数据在微前端qiankun框架模版中启动`yarn mockserver` -> `nodemon mock/server.js`

### 生产坏境打包压缩
```sh
    npm run build / yarn build
``` 

### 生产环境打包并查看分析报告
```sh
    npm run build --report / yarn build --report
```

### 部署
拷贝dist文件夹至服务器即可
