# jduc web

## introduction
- 城市计算前端开发脚手架 —— react + react-router + antd + mobx

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```
##　开发环境：　
- node: 10.8.0
- npm: 6.2.0
- react: 16.6.3

### Compiles and minifies
- dev: `npm run build:dev`
- test: `npm run build:test`
- production: `npm run build:prod`
- report: `npm run build --report` 可以在build环境路径下打开report.html查看依赖包的分析报告

## 项目结构

### 目录结构
  ```
  - build webpack配置文件
  - config 打包常量配置文件
  - public
    - index.html # 入口html
  - src # 业务代码
    - components # 组件
    - config # 常量
    - font  # iconfont文件
    - image # 图片
    - router # react-router 路由配置文件
    - service # 接口交互模块
    - store  # 数据
    - views  # 视图组件
    - index.js # 入口js
    - theme.js # 主题样式变量
  - babel.config.js # babel配置，当前支持到ie9
  - favicon.ico
  - .gitlab-ci.yml # cicd 配置文件
  - README.MD
  ```
### 命名规范， 可参考(https://css-tricks.com/react-code-style-guide/)
- 文件名：　
  - views文件及组件 使用大驼峰　——　`Dashboard.js, Dashboard.less`
  - 其他文件使用小驼峰 —— `main.js`
- 变量命名：小驼峰　——　`userName`

### Note
- 阿里自定义icon用法 `<i className="iconfont icon-eye-open" />`

### Eslint
```
airbnb
```

### Changes
```
基于antdesign
react,react-route,mobx,
配置webpack,压缩文件插件,source-map,gzip,尽量缩小文件体积
虚拟服务器,实时重新加载,支持css图片按相对路径加载
确保生产环境打包路径正确,提升报错体验等
按需加载lodash,moment,能按需加载的库都按需加载
可以按需改变主题颜色
src/components/common中存放公共组件，更改里面的公共组件逻辑要慎重，需全局检查或让其他人知悉
增加router.config.js并且可以在里面配置加载模块，在开发时提升webpack打包时间
```