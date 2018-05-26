const { Component } = require("hyperhtml/cjs");

class ListItem extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign({}, this.props);
  }

  render() {
    return this.html`
      <li style="${this.state.listItemStyle}">${this.state.item}</li>
    `;
  }
}

module.exports = class List extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign(
      {
        tag: "UL",
        listItems: [],
        listStyle: {},
        listItemStyle: {}
      },
      this.props
    );
  }

  render() {
    const li = this.state.listItems.map($ => {
      $.listItemStyle = this.state.listItemStyle;

      return ListItem.for($);
    });

    return this.state.tag.toUpperCase() === "UL"
      ? this.html`<ul style="${this.state.listStyle}">${li}</ul>`
      : this.html`<ol style="${this.state.listStyle}">${li}</ol>`;
  }
};
