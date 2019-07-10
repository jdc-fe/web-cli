const fs = require("fs")
const path = require('path')
const copydir = require('copy-dir')
const execa = require('execa')
const Log = require('./log')
const inquirer = require('inquirer');
const {PROJECT_TYPES, EXCLUDE, SOURCE_PATH_PREFIX, Logo, RENAME} = require('./config')
const root = path.join(__dirname, "../")

class Handler{
  constructor(name, {type, quiet}){
    if(!name) return console.log('no name....')
    this.targetPath = path.join(this.workspace, name)
    this.log = new Log(quiet)
    const judgeExistedName = this.readDirSync(path.join(root), name, this.log)
    if(judgeExistedName) return
    this.renamefiles = []
    this.selectProject(name)
  }

  async run(name) {
    await this.copyFiles(name)
    await this.fixRenameFiles()
    await this.initGit()
    this.success(name)
  }

  selectProject(name){
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'project',
          message: 'What base project do you need?',
          choices: PROJECT_TYPES,
          filter: function(val) {
            return val.toLowerCase();
          }
        }
      ])
      .then(answers => {
        this.projectPath = path.join(__dirname, SOURCE_PATH_PREFIX, answers.project)
        this.run(name)
      });
  }

  // 新建项目的时候，如果已有文件夹则提示无法创建
  readDirSync(path, name, log){
    let judgeExistedName = false;
  	var pa = fs.readdirSync(path);
  	pa.forEach(function(ele,index){
  		var info = fs.statSync(path+"/"+ele)
  		if(info.isDirectory()){
        if (ele === name) {
          log.error(`the project name - ${name} was existed, please rename the project name!`);
          judgeExistedName = true;
        }
  		}
  	})
    return judgeExistedName
  }

  get workspace() {
    // fix window cannot get pwd
    return process.env.PWD || process.cwd()
  }

  // fix npm rename gitignore to npmignore
  async fixRenameFiles() {
    const {targetPath, projectPath, renamefiles} = this

    if(renamefiles.length === 0) return;

    const projectPathLen = projectPath.length + 1
    const [from, to] = RENAME
    const opt = {stdio: 'inherit', cwd: targetPath}
    const regexp = new RegExp(`${from}$`)
    this.renamefiles.forEach(async path => {
      const fromPath = path.substr(projectPathLen)
      await execa('mv', [fromPath, fromPath.replace(regexp, to)], opt)
    })
  }

  async initGit() {
    const { targetPath } = this
    const opt = {stdio: 'inherit', cwd: targetPath}
    await execa('git', ['init'], opt)
    await execa('git', ['add', '-A'], opt)
    await execa('git', ['commit', '-m', 'init'], opt)
  }

  success(name) {
    this.log.clear()
    this.log.success(`\n  Successfully created project <${name}>. \n  Open the journey with the following commands: \n`)
    this.log.cmd(`cd ${name}`)
    this.log.cmd(`npm i`)
    this.log.cmd(`npm start`)
    this.log.raw(Logo)
  }

  async copyFiles() {
    const {targetPath, projectPath, renamefiles } = this
    const [from] = RENAME
    await copydir.sync(projectPath, targetPath, (stat, filepath, filename) => {
      if(EXCLUDE[stat] && EXCLUDE[stat].indexOf(filename) !== -1) return false;
      if(filename === from) renamefiles.push(filepath)
      return true;
    }, (err) => {
      this.log.error(err)
    })
  }

}

module.exports = Handler
