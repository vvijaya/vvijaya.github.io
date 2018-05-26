const { Component } = require("hyperhtml/cjs");
// const marked = require("marked");

const ArrowPad = require("../component/ArrowPad");
const Clock = require("../component/Clock");
const Header = require("../component/Header");
const result = require("../helper/result");

const _root = document.getElementById("root");
const { log } = console;
const fetchTimeline = {
  html: fetch("https://gunawan.wijaya.cc/api/timeline.json")
    .then(b => b.json())
    .then(b => JSON.stringify(b, null, 2)),
  placeholder: "Loading..."
};

_root.addEventListener("awesome", e => log(e.detail.text()));
// d.body.addEventListener(
//   "mousemove",
//   require("../helper/throttle")(e => log(e), 500)
// );

// <!-- <div>${{
//   placeholder: "abc",
//   html: fetch(
//     "https://raw.githubusercontent.com/gunawanwijaya/gunawanwijaya.github.io/master/pages/html.index.md"
//   )
//     .then(b => b.text())
//     .then(marked)
// }}</div> -->

module.exports = class PageHome extends Component {
  constructor(args) {
    super().props = args;
  }
  get defaultState() {
    return Object.assign(
      {
        count: 0
      },
      this.props
    );
  }
  doAThing(e, action) {
    setTimeout(() => this.setState({ count: ++this.state.count }), 500);
    this.setState({ action });
    result(e.target, _root).dispatchEvent(
      new CustomEvent("awesome", {
        bubbles: true,
        detail: { text: () => Math.random() }
      })
    );
  }

  render() {
    return this.html`
      ${Header.for({})}
      <p style="${{ whiteSpace: "nowrap" }}">${fetchTimeline}</p>
      ${ArrowPad.for({ action: "love" })}
      ${Clock.for({ date: new Date() })}
    `;
  }
};
