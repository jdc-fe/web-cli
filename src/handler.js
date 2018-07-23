const fs = require("fs")
const path = require('path')
const copydir = require('copy-dir')
const execa = require('execa')
const Log = require('./log')
const {PROJECT_TYPES, EXCLUDE, SOURCE_PATH_PREFIX, Logo} = require('./config')

class Handler{
  constructor(name, {type, quiet}){
    this.targetPath = path.join(this.workspace, name)
    this.log = new Log(quiet)

    if(PROJECT_TYPES.indexOf(type) === -1)
      return this.log.error('invalid type')
    this.projectPath = path.join(__dirname, SOURCE_PATH_PREFIX, type)

    this._handleFiles(name)
  }

  get workspace() {
    // fix window cannot get pwd
    return process.env.PWD || process.cwd()
  }

  async _handleFiles(name) {
    const {targetPath, projectPath, quiet } = this

    copydir.sync(projectPath, targetPath, (stat, filepath, filename) => {
      if(EXCLUDE[stat] && EXCLUDE[stat].indexOf(filename) !== -1) return false;

      return true;
    }, (err) => {
      this.log.error(err)
    })

    const opt = {stdio: 'inherit', cwd: targetPath}

    await execa('git', ['init'], opt)
    await execa('git', ['add', '-A'], opt)
    await execa('git', ['commit', '-m', 'init'], opt)

    this.log.clear()

    this.log.success(`\n  Successfully created project <${name}>. \n  Open the journey with the following commands: \n`)
    this.log.cmd(`cd ${name}`)
    this.log.cmd(`npm i`)
    this.log.cmd(`npm start`)
    this.log.raw(Logo)
  }


}

module.exports = Handler
