# 使用介绍

基于vue技术栈搭建的初始化框架。包括 `vue`+`vuex`+`vue-router`+`axios`+`element-ui`

## 功能列表

### 项目结构， 见README.md

### 脚手架

### 入口文件 `main.js`

集成了vue-router、 vuex、 element-ui、logger 插件、 track 插件，可根据项目情况选择使用哪几项。无需使用时注释掉就好。

名称|作用|是否必选
--|--|--
vue-router|集成路由模块，提供按需加载功能|否
vuex|集成vuex，可提供共享数据模块|否
element-ui|集成element-ui|否
logger 插件|日志打印插件，封装了`console[info|warn|error]`功能， 可在全局状态下控制日志输出|是
track 插件|做打点统计用|否

### 日志打印 -- console.log 替代方法

使用 Vue.$log[info|warn|error]和vm作用域下的 this.$log[info|warn|error] 来实现 console[log|warn|error] 功能
