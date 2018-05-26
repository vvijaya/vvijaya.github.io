const bind = require("hyperhtml/cjs").bind(document.getElementById("root"));
const app = require("hyperhtml-app")();
const Home = require("./page/Home");

app.get("*", ctx => {
  console.log("Welcome", ctx);
});

app.use("/:args", (ctx, next) => {
  console.log("args >> ", ctx);
});

// app.navigate("/hyper");

bind`
  ${new Home()}
`;
