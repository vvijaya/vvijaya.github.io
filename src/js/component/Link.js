const { Component } = require("hyperhtml/cjs");

module.exports = class Link extends Component {
  constructor(args) {
    super().props = args;
    this.setState(args);
  }

  get defaultState() {
    return {
      class: null,
      style: null,
      href: "#",
      click: () => {},
      content: null
    };
  }

  render() {
    return this.html`
    <a class="${this.state.class}" style="${this.state.style}"
      href="${this.state.href}" onclick="${this.state.click}"
    >
      ${this.state.content}
    </a>
    `;
  }
};