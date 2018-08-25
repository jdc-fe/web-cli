## Introduction
- quick start for web project
- collect urban frameworks

## todo
- [ ] add logger plugin
- [ ] user select type `inquirer`
- [ ] add unit test
- [x] if no name; print discription
- [x] add folder service
- [x] add some utils
- [x] airbnb standard
- [x] overlay eslint error
- [x] install package `execa`
- [x] add chalk logs
- [x] publish to npm

## note
- [npm ignore](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package)
  - 如果没有 .npmignore 会使用 .gitignore， 如果都有就执行并集
  - `npm pack` —— Testing whether your .npmignore or files config works
  - npm install 会把文件里的 .gitignore 文件变成 .npmignore 文件；通过文件重命名来fix

## Installation
```
$ npm i -g git+http://git.jd.com/web-uc/web-cli.git
```

## Usage
```
$ webcli -h

Usage: index [options] <name>


  Options:

    -V, --version     output the version number
    -t --type [type]  vue-eslint default is vue-eslint
    -q --quiet        will not print anything
    -h, --help        output usage information
```

### Example
- `webcli -t vue-eslint demo`


## development
<!-- - `npm link`: link to global environment -->