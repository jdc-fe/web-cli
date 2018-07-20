const chalk = require('chalk')
const {LOG_PREFIX} = require('./config')

class Log{
  constructor(quiet = false) {
    const levelMap = {
      info: 'blue',
      warn: 'yellow',
      error: 'red'
    }

    Object.keys(levelMap).forEach((level) => {
      const levelInfo = chalk[levelMap[level]](`${LOG_PREFIX} ${level.toUpperCase()}:`)
      this[level] = (...args) => {
        if(quiet && level !== 'error') return;
        console.log(levelInfo, ...args)
      }
    })
  }
}

module.exports = Log