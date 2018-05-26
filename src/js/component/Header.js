const { Component } = require("hyperhtml/cjs");
const app = require("hyperhtml-app")();
const Link = require("./Link");
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
        listItems: "saya mau makan nasi goreng".split(" ").map(x => ({
          item: Link.for({
            href: `/${x}`,
            text: `/${x}`,
            click: () => app.navigate(`/${x}`)
          })
        })),
        listStyle: { display: "inline-block", margin: 0, padding: 0 },
        listItemStyle: { display: "inline-block" }
      })}</header>
    `;
  }
};
