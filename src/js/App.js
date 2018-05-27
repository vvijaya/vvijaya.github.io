/** @returns {void} */
const noop = () => {};
const { log: clog, error: cerr } = console;
const bind = require("hyperhtml/cjs").hyper(document.getElementById("root"));
const app = require("hyperhtml-app")();
const Home = require("./page/Home");
const NotFound = require("./page/NotFound");

app.get("*", (ctx, next) => {
  try {
    clog(ctx);
    switch (ctx.params[0]) {
      case "/":
        bind`${Home.for({})}`;
        break;
      default:
        bind`${NotFound.for({})}`;
        break;
    }
  } catch (error) {
    noop(error);
  }
});

app.navigate(window.location.pathname);
