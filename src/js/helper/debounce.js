module.exports = (cb = () => {}, wait = 10, immediate = false) => {
  /* eslint-disable require-jsdoc */
  let timeout = null;
  const func = (...args) => {
    if (immediate || !timeout) {
      Reflect.apply(cb, func, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      Reflect.apply(cb, func, args);
    }, wait);
  };
  /* eslint-enable require-jsdoc */

  return func;
};
