module.exports = str => {
  const dom = document.createElement("div");

  dom.innerHTML = str;

  return dom.firstChild;
};
