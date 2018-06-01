const { Component } = require("hyperhtml/cjs");

module.exports = class Header extends Component {
  constructor(args) {
    super().props = args;
    this.setState(args);
  }

  get defaultState() {
    return {
      class: null,
      style: null,
      content: null
    };
  }

  render() {
    return this.html`
    <header class="${this.state.class}" style="${this.state.style}">
      <div class="container clear">
        ${this.state.content}
      </div>
    </header>
    `;
  }
};
