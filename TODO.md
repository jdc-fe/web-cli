
## todo
- [x] 新建项目的时候，如果已有文件夹则提示无法创建
- [x] user select type `inquirer`
- [ ] add unit test
- [x] add logger plugin
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
- [leaflet markdown guide](https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#demo)

- 本地开发会有一个坑：
  - .gitignore 在发布到 npmjs 后会变成 .npmignore, 就会导致原有的 .npmignore 文件丢失，并且 .gitignore 的文件也会被过滤掉。
  - 所以需要将本地的 .npmignore 重名为 npmignore, 在脚本初始化项目的时候再重新命名为 .npmignore
