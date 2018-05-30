module.exports = {
  //
  /**
   * @param {HTMLElement} el el
   * @param {String} type type
   * @param {Object} payload payload
   * @returns {void} v
   */
  send(el, type, payload) {
    el.dispatchEvent(new CustomEvent(type, payload));
  },
  //
  /**
   * @param {HTMLElement} el el
   * @param {String} type type
   * @param {Function} cb cb
   * @returns {void} v
   */
  recv(el, type, cb) {
    el.addEventListener(type, cb);
  }
};
