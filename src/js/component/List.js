const { Component } = require("hyperhtml/cjs");
// const { log: clog } = console;

class ListItem extends Component {
  constructor(args) {
    super().props = args;
    this.setState(this.props);
  }

  get defaultState() {
    return {
      listItemStyle: {}
    };
  }

  render() {
    // clog("LI", this.state.listItemStyle);

    return this.html`
      <li style="${this.state.listItemStyle}">${this.state.item}</li>
    `;
  }
}

module.exports = class List extends Component {
  constructor(args) {
    super().props = args;
    // this.setState(
    //   Object.assign(
    //     {
    //       tag: "UL",
    //       listItems: [],
    //       listStyle: {},
    //       listItemStyle: {}
    //     },
    //     args
    //   )
    // );
  }

  get defaultState() {
    return (
      this.props || {
        tag: "UL",
        listItems: [],
        listStyle: {},
        listItemStyle: {}
      }
    );
  }

  render() {
    // clog("UL", this.state.listItems);

    const li = this.state.listItems.map($ => {
      $.listItemStyle = this.state.listItemStyle;

      return ListItem.for($);
    });

    return this.state.tag.toUpperCase() === "UL"
      ? this.html`<ul style="${this.state.listStyle}">${li}</ul>`
      : this.html`<ol style="${this.state.listStyle}">${li}</ol>`;
  }
};
