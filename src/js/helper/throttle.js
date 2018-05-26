module.exports = (cb = () => {}, wait = 10, immediate = false) => {
  /* eslint-disable require-jsdoc */
  let timeout = null;
  let last = null;
  let now = null;
  const func = (...args) => {
    now = new Date().getTime();
    if (immediate || now > last + wait) {
      last = now;
      Reflect.apply(cb, func, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      last = now;
      Reflect.apply(cb, func, args);
    }, wait);
  };
  /* eslint-enable require-jsdoc */

  return func;
};
