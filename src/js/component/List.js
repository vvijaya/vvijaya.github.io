const { Component } = require("hyperhtml/cjs");

class ListItem extends Component {
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
    <li class="${this.state.class}" style="${this.state.style}">
      ${this.state.content}
    </li>
    `;
  }
}

module.exports = class List extends Component {
  constructor(args) {
    super().props = args;
    this.setState(args);
  }

  get defaultState() {
    return {
      tag: "ul",
      content: null,
      class: null,
      style: null,
      li: { class: null, style: null }
    };
  }

  render() {
    this.li = this.state.content.map($ =>
      ListItem.for(
        Object.assign($, {
          class: this.state.li.class,
          style: this.state.li.style
        })
      )
    );

    return this.state.tag.toLowerCase() === "ul"
      ? this.html`
      <ul class="${this.state.class}" style="${this.state.style}">
        ${this.li}
      </ul>
      `
      : this.html`
      <ol class="${this.state.class}" style="${this.state.style}">
        ${this.li}
      </ol>
      `;
  }
};
