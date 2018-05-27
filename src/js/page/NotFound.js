const { Component } = require("hyperhtml/cjs");
// const marked = require("marked");

module.exports = class Home extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign({}, this.props);
  }

  render() {
    return this.html`
      ${{
        placeholder: ".",
        html: fetch("https://gunawan.wijaya.cc/api/pages.json")
          .then(x => x.json())
          .then(a => a.filter(x => x.url === "/404.html")[0].content)
      }}
    `;
  }
};
