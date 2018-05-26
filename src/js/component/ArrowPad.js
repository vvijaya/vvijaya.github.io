const { Component } = require("hyperhtml/cjs");
const result = require("../helper/result");

module.exports = class ArrowPad extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign({ count: 0 }, this.props);
  }
  doAThing(e, action) {
    setTimeout(() => this.setState({ count: ++this.state.count }), 500);
    this.setState({ action });
    result(e.target, document.getElementById("root")).dispatchEvent(
      new CustomEvent("awesome", {
        bubbles: true,
        detail: { text: () => Math.random() }
      })
    );
  }

  render() {
    return this.html`
      <button onclick="${e => this.doAThing(e, "◂ - LEFT")}">◂</button>
      <button onclick="${e => this.doAThing(e, "▴ - UP")}">▴</button>
      <button onclick="${e => this.doAThing(e, "▾ - BOTTOM")}">▾</button>
      <button onclick="${e => this.doAThing(e, "▸ - RIGHT")}">▸</button>
      <p>Last action: ${this.state.action}</p>
      <p>Counter: ${this.state.count}</p>
    `;
  }
};
