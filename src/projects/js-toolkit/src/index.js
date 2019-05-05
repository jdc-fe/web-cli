// import { MSG } from './config';

class Animal {
  constructor({ name }) {
    this.name = name;
  }

  say(...args) {
    console.log(this.name, 'say', ...args);
  }
}

module.exports = Animal;
