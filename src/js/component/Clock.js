const { Component } = require("hyperhtml/cjs");

module.exports = class ArrowPad extends Component {
  constructor(args) {
    super().props = args;

    /** @returns {void} */
    const tick = () => {
      this.setState({ date: new Date() });
      setTimeout(tick, 50);
    };

    tick();
  }
  get defaultState() {
    return Object.assign({}, this.props);
  }

  render() {
    return this.html`
      <div>
        <h1>Hello, world!</h1>
        <h2>It is ${this.state.date.toLocaleTimeString()}.</h2>
      </div>
    `;
  }
};
