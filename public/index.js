const data = {
  item1: 'run start',
  item2: 'display',
  ifShow: true,
  elements: ['111', '222', '333', '444']
};

let jsx = createElement(View, {id: "main"}, createElement("ul", {className: "list"}, 
data.elements.map(item => createElement("li", {className: "item"
}, item)),
createElement("li", {className: "item",style: {
    background: 'blue',
    color: 'pink'
  },onClick: () => alert(1)}, data.item1), 
createElement("li", {className: "item",style: {
    background: 'red',
    color: 'black'
  },onClick: () => alert(404)}, data.item2), 
createElement("li", {className: "item"}, 
data.ifShow ? 123 : "")), 
createElement(View, {
  id: "data",
  show: data.ifShow
}, 
createElement("h1", null, "这是一级段落的开头："), createElement("h2", null, "这是二级段落的开头："), createElement("h3", null, "这是三级段落的开头：")), createElement("button", {
  onclick: () => ViewShow.publish("data")
}, "展示"), 
createElement(List, {
  id: "list",
  textColor: '#fff'
}));

render(jsx, document.getElementById('root'));