/**
 * 函数节流
 * usage
 *  const say = (str) => console.log(str)
 *  const delaySay = throttle(say, 300)
 *  delaySay('hello')
 *  setInterval(()=> delaySay('world'), 10)
 *  // will print: world
 */
export const throttle = (fn, delay) => {
  let clork;
  return (...args) => {
    if (clork) {
      clearTimeout(clork);
      clork = null;
      return;
    }
    clork = setTimeout(() => fn(...args), delay);
  };
};
