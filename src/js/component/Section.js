const { Component } = require("hyperhtml/cjs");

module.exports = class Section extends Component {
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
    <section class="${this.state.class}" style="${this.state.style}">
      <div class="container clear">
        ${this.state.content}
      </div>
    </section>
    `;
  }
};
