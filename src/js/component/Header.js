const { Component } = require("hyperhtml/cjs");
const List = require("./List");

module.exports = class Header extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign({}, this.props);
  }

  render() {
    return this.html`
      <header
        class="clear"
        style="${{ background: "#f009" }}"
      >${List.for({
        tag: "UL",
        listItems: this.state.listItems,
        listStyle: { display: "inline-block", margin: 0, padding: 0 },
        listItemStyle: { display: "inline-block" }
      })}</header>
    `;
  }
};
