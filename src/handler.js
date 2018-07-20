const fs = require("fs")
const path = require('path')
const copydir = require('copy-dir')

const PROJECT_TYPES = ['vue-eslint', 'vue-tslint']
const SOURCE_PATH_PRIFEX = './projects'

class Handler{
  constructor(name, {type, quiet}){
    this.targetPath = path.join(this.workspace, name)

    if(PROJECT_TYPES.indexOf(type) === -1)
      return console.error('invalid type')
    this.projectPath = path.join(__dirname, SOURCE_PATH_PRIFEX, type)
    this.quiet = quiet

    this._handleFiles()
  }

  get workspace() {
    // fix window cannot get pwd
    return process.env.PWD || process.cwd()
  }

  _handleFiles() {
    const {targetPath, projectPath, quiet } = this
    copydir(projectPath, targetPath, () => {
      console.log('success')
      // todo install package
    })

  }

}

module.exports = Handler
