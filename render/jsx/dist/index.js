const data = {
  item1: 'abc',
  item2: '123'
};

const jsx = createElement("ul", {
  className: "list"
}, createElement("li", {
  className: "item",
  style: {
    background: 'red',
    color: 'blue'
  },
  onClick: () => alert(2)
}, "aaa"), createElement("li", {
  className: "item"
}, data.item1, createElement("i", null, "come")), createElement("li", {
  className: "item"
}, data.item2));
render(jsx, document.getElementById('root'));