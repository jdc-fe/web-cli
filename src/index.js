#!/usr/bin/env node

const program = require('commander');
const Handler = require('./handler')
const {version} = require('../package.json')

program.arguments('<name>')
      // .usage('webuc-cli [options] <name>')
      .description('web project quick start.\n  todo: add modules <vue-tslint> <react-tslint>')
      .version(version)
      .option('-t --type [type]', 'vue-eslint, vue-tslint default is vue-eslint', 'vue-eslint')
      .option('-q --quiet', 'will not print anything', true)
      .action(function(name) {
        new Handler(name, program)
      })
      .parse(process.argv)
