module.exports = (el, type, payload) => {
  el.dispatchEvent(new CustomEvent(type, payload));
};
