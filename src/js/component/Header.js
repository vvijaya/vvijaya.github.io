const { Component } = require("hyperhtml/cjs");
const List = require("./List");
// const { log: clog } = console;

module.exports = class Header extends Component {
  constructor(args) {
    super().props = args;
    this.setState(this.props);
  }

  get defaultState() {
    return {
      listItems: []
    };
  }

  render() {
    // clog("HEADER", this.state.listItems);

    return this.html`
      <header
        class="clear"
        style="${{ background: "#f009" }}"
      >
        ${new List({
          tag: "UL",
          listItems: this.state.listItems,
          listStyle: { display: "inline-block", margin: 0, padding: 0 },
          listItemStyle: { display: "inline-block" }
        })}
      </header>
    `;
  }
};
