const fs = require("fs")
const path = require('path')
const copydir = require('copy-dir')
const { exec } = require('child_process')
const Log = require('./log')
const {PROJECT_TYPES, SOURCE_PATH_PREFIX} = require('./config')

class Handler{
  constructor(name, {type, quiet}){
    this.targetPath = path.join(this.workspace, name)

    this.log = new Log(quiet)

    if(PROJECT_TYPES.indexOf(type) === -1)
      return this.log.error('invalid type')
    this.projectPath = path.join(__dirname, SOURCE_PATH_PREFIX, type)

    this._handleFiles()
  }

  get workspace() {
    // fix window cannot get pwd
    return process.env.PWD || process.cwd()
  }

  _handleFiles() {
    const {targetPath, projectPath, quiet } = this
    copydir(projectPath, targetPath, () => {
      this.log.info('success..')
      // exec(`pwd && cd ${targetPath} && npm i `, (error, stdout, stderr) => {
      //   if(error) {
      //     console.error('exec error', error)
      //     return
      //   }

      //   console.info('stdout', stdout)
      //   console.warn('stderr', stderr)
      // })
      // todo install package
    })

  }

}

module.exports = Handler
