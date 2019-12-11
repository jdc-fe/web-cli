# Feature List

## todo
- [ ] add unit test
- [ ] add vue-admin
- [ ] sync theme convention
- [ ] build base scanffold for all projects
  - [ ] import with npm
  - [ ] include axios api, ui convention, base ui component library, layout, auth, permission, vue+vuex+vue-router, react+mobx+react-router
  - [ ] all of these modules have interface to extend
  - [ ] update by npm pump

## v1.1.1
- [x] add mockjs to vue-eslint & react-antd
- [x] fix vue-eslint hot reload

## v1.1.0
- [x] add logger plugin
- [x] user select type `inquirer`
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
