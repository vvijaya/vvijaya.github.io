// /** @returns {void} */
// const noop = () => {};
const { log: clog } = console;
const d = document;

d.root = d.getElementById("root");
// const bind = require("hyperhtml/cjs").hyper(d.root);
const app = require("hyperhtml-app")();
const { Component, bind } = require("hyperhtml/cjs");

const signal = require("./helper/signal");
const result = require("./helper/result");
const ArrowPad = require("./component/ArrowPad");
const Clock = require("./component/Clock");
const Header = require("./component/Header");
const Link = require("./component/Link");

const URI = "http://localhost:4000";

class App extends Component {
  constructor() {
    super();
    fetch(`${URI}/api/pages.json`)
      .then(b => b.json())
      .then(b =>
        b
          .filter(b => b.permalink && b.menu_index >= 0)
          .sort((a, b) => a.menu_index - b.menu_index)
          .map(b => ({
            item: Link.for({
              text: b.title,
              href: b.url,
              click: e => {
                // signal.send(d.root, "navigate", {
                //   detail: { e, route: b.url }
                // });
                clog(e);
                this.setState({ route: b.url });
                app.navigate(b.url);
              }
            })
          }))
      )
      .then(b => {
        this.setState({ listItems: b });
      });
    signal.recv(d.root, "navigate", e => {
      clog("navigate", result(e.detail.route));
      clog("listItems", result(this.state.listItems));
      // result(e.detail.route) && this.setState({ route: e.detail.route });
    });
  }

  get defaultState() {
    return {
      route: "/",
      html: d.getElementById("content").innerHTML,
      listItems: Array(2)
        .fill()
        .map((a, i) => ({
          item: Link.for({
            text: `#${i}`,
            href: `#${i}`,
            click: e => {
              // signal.send(d.root, "navigate", {
              //   detail: { e, route: `#${i}` }
              // });
              clog(e);
              this.setState({ route: `#${i}` });
              app.navigate(`#${i}`);
            }
          })
        }))
    };
  }

  render() {
    return this.html`
    ${new Header({ listItems: this.state.listItems })}
    <p>${this.state.route}</p>
    <div>
      ${{ html: this.state.html }}
      ${new ArrowPad({ action: "love" })}
      ${new Clock({ date: new Date() })}
    </div>
    `;
  }
}

bind(d.root)`${new App()}`;

// app.get("*", async (ctx, next) => {
//   try {
//     await _app.setState({ route: ctx.params[0] });
//     clog("CTX >>", ctx);
//     clog("OK  >>", _app.state);
//   } catch (error) {
//     clog("err >>", error);
//   }

//   // return next();
// });

// app.navigate(window.location.pathname);

// (async () => {
//   await Promise.all([
//     fetch(`${URI}/api/pages.json`)
//       .then(b => b.json())
//       .then(b =>
//         b
//           .filter(b => b.permalink && b.menu_index >= 0)
//           .sort((a, b) => a.menu_index - b.menu_index)
//           .map(b => ({ item: Link.for({ text: b.title, href: b.url }) }))
//       )
//       .then(b => {
//         _app.setState({ listItems: b });
//       })

//     // fetch(`${URI}${ctx.params[0]}`)
//     //   .then(b => b.text())
//     //   .then(b => {
//     //     const c = d.getElementById("content");

//     //     c.innerHTML = b;
//     //     c.innerHTML = c.content.getElementById("content").innerHTML;

//     //     return c.innerHTML;
//     //   })
//   ]);

//   // _app.setState({ listItems, html });
// })();
