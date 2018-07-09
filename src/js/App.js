// /** @returns {void} */
// const noop = () => {};
// const { log: clog } = console;
const d = document;

d.root = d.getElementById("root");
d.tmpl = d.getElementById("content");
const app = require("hyperhtml-app")();
const { Component, bind } = require("hyperhtml/cjs");

// const signalRecv = require("./helper/signalRecv");
// const signalSend = require("./helper/signalSend");
// const result = require("./helper/result");
// const ArrowPad = require("./component/ArrowPad");
// const Clock = require("./component/Clock");
const Header = require("./component/Header");
const Section = require("./component/Section");
const Link = require("./component/Link");
const List = require("./component/List");

const URI = "http://localhost:4000";
const extBtoa = require("./helper/extendBtoa");

class App extends Component {
  constructor() {
    super();
    this.menuFetch();
    this.url = window.location.href.replace(URI, "");
  }

  get defaultState() {
    return {
      route: window.location.href.replace(URI, ""),
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
    const pageRender = () => {
      this.setState({
        html: this.cachedPages[this.url],
        route: this.url
      });
    };

    this.url = b.url;
    app.navigate(this.url);
    this.cachedPages = this.cachedPages || {};
    if (this.cachedPages[this.url]) {
      pageRender();
    } else {
      fetch(`${URI}${this.url}`)
        .then(b => b.text())
        .then(b => {
          d.tmpl.innerHTML = b;
          d.tmpl.innerHTML = d.tmpl.content.getElementById("content").innerHTML;
          this.cachedPages[this.url] = d.tmpl.innerHTML;
          pageRender();
        });
    }
  }
  preprocess(html) {
    html = html.replace(/(<!--)\s*(-->)/gi, "$1 $2");
    html = html.replace(
      /data-id="([^"]*)"/gi,
      (...p) => `id="${extBtoa(p[1])}"`
    );

    return html;
  }

  render() {
    return this.html`
    <style>
      #root { text-align: center; padding-top: 60px; }
      #root header {
        border-bottom: solid;
        position: fixed;
        width: 100%;
        margin-top: -60px;
        z-index: 1000;
      }
      #root header:before {
        content: '';
        position: absolute;
        background: #0003;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      #root header * { background: transparent; }
      #root header ul { white-space: nowrap; display: block; margin: 0px; padding: 0px; }
      #root header ul li { display: inline-block; }
      #root header ul li a { padding: 1em .5em; display: inline-block; text-decoration: none; }
      #root header ul li a:hover { background: #0003; }
      #root header ul li a.active { background: #0006; }
      blockquote { border-bottom: solid; background: #0003; max-width: 20.5em; }

      #omnibox {
        padding: .4em .5em;
        border: solid 1px;
        border-radius: .15em;
        font-size: 1.5em;
        background: #fff;
        max-width: 100%;
        width: 20em;
      }
      #omnibox:focus { box-shadow: 0 0 0 0.2em #0003, inset 0 0 0 1px #0006; }
      .work { padding: .5em; }
      .work p { margin-top: 0; }
      .work .up a { border: solid 1px #8BC34A; }
      .work .down a { border: solid 1px #EF5350; }
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
    ${new Section({
      content: {
        html: this.preprocess(this.state.html)
      }
    })}
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
