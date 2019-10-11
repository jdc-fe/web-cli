## Introduction
- quick start for web project
- collect urban frameworks

## Installation
```
$ npm i -g jdc-webcli
```

## Build step
```bash
# install
npm i -g jdc-webcli

# create base project
node src example

# cmd help
node src

# publish
npm run release

```

## Usage
```
$ webcli -h

Usage: index [options] <name>


  Options:

    -V, --version     output the version number
    -q --quiet        will not print anything
    -h, --help        output usage information
```

### Example
- `webcli demo`

## API

### vue-eslint
vue base project

- stack: `vue` + `vuex` + `vue-router` + `axios`
- style sheet: `stylus`
  - `variable.styl` include variable, function etc
- eslint: `airbnb-base`

### react-antd
react+antd base project

- stack: `react` + `react-router` + `mobx` + `antd` + `axios`
- styl sheet: `stylus`
- eslint: `airbnb-base`

### js-tookit
javascript node_module package base project

- webpack: build JavaScript to dist/index.min.js
- unit test: `mocha` + `power-assert` + `sinon` + `nyc`
- eslint: `airbnb-base`

## Feature List
### 1.2.0
- vue-eslint add ui convention, import element-ui
