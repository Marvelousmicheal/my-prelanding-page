const select = (elem) => {
  return document.querySelector(elem);
};

const selectAll = (elem) => {
  return Array.from(document.querySelectorAll(elem));
};

const create = (elem) => {
  return document.createElement(elem);
};

export { select, selectAll, create };
