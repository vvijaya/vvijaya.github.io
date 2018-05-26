module.exports = (val, def) => {
  try {
    return (require("./is")(val, Function) ? val() : val) || def;
  } catch (e) {
    return def;
  }
};
