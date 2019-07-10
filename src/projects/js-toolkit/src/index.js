// import { MSG } from './config';

class Animal {
  constructor({ name } = {}) {
    this.name = name;
  }

  say(msg) {
    console.log(this.name, 'say', msg);
  }
}

module.exports = Animal;
