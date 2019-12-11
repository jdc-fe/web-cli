## Introduction
- quick start for web project
- collect urban frameworks

## Installation
```
$ npm i -g git+http://git.jd.com/web-uc-weapons/web-cli.git
```

## Usage
```
$ webcli -h

Usage: index [options] <name>


  Options:

    -V, --version     output the version number
    -t --type [type]  vue-eslint, js-toolkit default is vue-eslint
    -q --quiet        will not print anything
    -h, --help        output usage information
```

### Example
- `webcli -t vue-eslint demo`

## API

### vue-eslint
vue base project

- 基础框架 `vue` + `vuex` + `vue-router`
- ajax 请求 `axios`
- 样式模板 `stylus`， 支持变量、函数，见`variable.styl`
- 代码检查 `airbnb-base`

### js-tookit
javascript node_module package base project

- 脚手架 `webpack`， 帮助编译 JavaScript 文件到 dist 里
- 单测 `mocha` + `power-assert` + `sinon` + `nyc`
- 代码检查 `airbnb-base`

### react-antd
react+antd base project

- 基础框架 `react` + `react-router` + `mobx` + `antd`
- ajax 请求 `axios`
- 样式模板 `stylus`
- 代码检查 `airbnb-base`

## development
<!-- - `npm link`: link to global environment -->

## [FEATURE LIST](./TODO.md)
