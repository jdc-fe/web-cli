import Vue from 'vue';
/**
 * usage
 *  - Vue.$log.[info|warn|error]()
 *  - vm.$log.[info|warn|error]()
 */

class Logger {
  constructor(debug) {
    ['info', 'warn', 'error'].forEach((key) => {
      // eslint-disable-next-line no-console
      this[key] = (...args) => (debug ? console[key](...args) : '');
    });
    // this.error = console.error;
  }
}

Vue.use({
  install(V) {
    const debug = process.env.NODE_ENV !== 'production';
    const log = new Logger(debug);
    V.$log = log;
    V.prototype.$log = log;
  }
});
