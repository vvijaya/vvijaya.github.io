// /** @returns {void} */
// const noop = () => {};
const { log: clog } = console;
const d = document;

d.root = d.getElementById("root");
d.tmpl = d.getElementById("content");
const app = require("hyperhtml-app")();
const { Component, bind } = require("hyperhtml/cjs");

// const signal = require("./helper/signal");
// const result = require("./helper/result");
// const ArrowPad = require("./component/ArrowPad");
// const Clock = require("./component/Clock");
const Header = require("./component/Header");
const Section = require("./component/Section");
const Link = require("./component/Link");
const List = require("./component/List");

const URI = "http://localhost:4000";

class App extends Component {
  constructor() {
    super();
    this.menuFetch();
    this.url = "/";
  }

  get defaultState() {
    return {
      route: "/",
      html: d.tmpl.innerHTML,
      ofHeaderListItems: [1, 2, 3]
    };
  }

  menuFetch() {
    fetch(`${URI}/api/pages.json`)
      .then(b => b.json())
      .then(b =>
        b
          .filter(b => b.permalink && b.menu_index >= 0)
          .sort((a, b) => a.menu_index - b.menu_index)
      )
      .then(b => {
        this.setState({ ofHeaderListItems: b });
      });
  }

  menuClicked(e, b) {
    if (!(e && b)) {
      return;
    }

    /** @returns {void} */
    const refresh = () => {
      this.setState({
        html: this.cachedPages[this.url],
        route: this.url
      });
    };

    this.url = b.url;
    app.navigate(this.url);
    this.cachedPages = this.cachedPages || {};
    if (this.cachedPages[this.url]) {
      refresh();
    } else {
      fetch(`${URI}${this.url}`)
        .then(b => b.text())
        .then(b => {
          d.tmpl.innerHTML = b;
          d.tmpl.innerHTML = d.tmpl.content.getElementById("content").innerHTML;
          this.cachedPages[this.url] = d.tmpl.innerHTML;
          refresh();
        });
    }
  }

  render() {
    return this.html`
    <style>
      #root { text-align: center; }
      #root header { border-bottom: solid; background: #0003; }
      #root header ul { white-space: nowrap; display: block; margin: 0px; padding: 0px; }
      #root header ul li { display: inline-block; }
      #root header ul li a { padding: 1em .5em; display: inline-block; text-decoration: none; }
      #root header ul li a:hover { background: #0003; }
      #root header ul li a.active { background: #0006; }
      blockquote { border-bottom: solid; background: #0003; max-width: 20.5em; }
    </style>
    ${new Header({
      content: new List({
        tag: "UL",
        class: "no-scrollbar",
        content: this.state.ofHeaderListItems.map(b => ({
          content: Link.for({
            content: b.title || "#",
            click: e => this.menuClicked(e, b),
            class: b.url === this.state.route ? "active" : null,
            href: b.url || "#"
          })
        }))
      })
    })}
    ${new Section({ content: { html: this.state.html } })}
    `;
  }
}

bind(d.root)`${new App()}`;

/*
<div style="${{ display: "none" }}">
<p>${this.state.route}</p>
${new ArrowPad({ action: "love" })}
${new Clock({ date: new Date() })}
</div>
*/
