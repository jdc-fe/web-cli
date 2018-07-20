const chalk = require('chalk')
const {LOG_PREFIX} = require('./config')

class Log{
  constructor(quiet = false) {
    this.log = quiet ? () => {} : console.log
    const levelMap = {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      success: 'green'
    }

    Object.keys(levelMap).forEach((level) => {
      const levelInfo = chalk[levelMap[level]](`${LOG_PREFIX} ${level.toUpperCase()}:`)
      this[level] = (...args) => {
        if( level === 'error') return console.log(levelInfo, ...args);
        this.log(levelInfo, ...args)
      }
    })
  }

  clear() {
    // clear screen
    process.stdout.write('\u001b[2J')
    process.stdout.write('\u001b[1;1H')
  }

  cmd(str) {
    console.log('  $', chalk.blue(str))
  }

  raw(...args) {
    console.log(...args)
  }
}

module.exports = Log