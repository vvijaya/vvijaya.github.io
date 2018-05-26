const { Component } = require("hyperhtml/cjs");

module.exports = class Link extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign(
      {
        click: () => {},
        href: "#",
        style: {
          display: "inline-block",
          padding: ".5em .25em"
        },
        text: null
      },
      this.props
    );
  }

  render() {
    return this.html`
      <a
        onclick="${this.state.click}"
        href="${this.state.href}"
        style="${this.state.style}"
      >${this.state.text}</a>
    `;
  }
};
