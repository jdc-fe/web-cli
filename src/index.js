#!/usr/bin/env node

const program = require('commander');
const Handler = require('./handler');
const {version, name} = require('../package.json');
const { PROJECT_TYPES } = require('./config');

let projectName
program.arguments('<name>')
  .name(name)
  .description('web project quick start.\n  todo: add modules <vue-tslint> <react-tslint>')
  .version(version)
  .option('-q --quiet', 'will not print anything', true)
  .action(function(name) {
    projectName = name
    new Handler(projectName, program)
  })

program.parse(process.argv)

if(!projectName) {
  console.log(program.helpInformation())
}
