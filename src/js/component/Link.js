const { Component } = require("hyperhtml/cjs");
// const { log: clog } = console;

module.exports = class Link extends Component {
  constructor(args) {
    super().props = args;
    this.setState(this.props);
  }

  get defaultState() {
    return {
      style: {
        display: "inline-block",
        padding: ".5em .25em"
      },
      text: null,
      href: "#",
      click: () => {}
    };
  }

  render() {
    // clog("A", this.state.href);

    return this.html`
      <a
        style="${this.state.style}"
        href="${this.state.href}"
        onclick="${this.state.click}"
      >${this.state.text}</a>
    `;
  }
};
