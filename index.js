const data = {
    item1: 'run start',
    item2: 'display',
    ifShow: true,
    elements: ['111', '222', '333', '444']
}

let jsx =
    <View id="main">
        <ul className="list">
            <li className="item">{data.ifShow ? 123 : ""}</li>
            <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(1)}>{data.item1}</li>
            <li className="item" style={{ background: 'white', color: 'red' }} onClick={() => alert(404)}>{data.item2}</li>
            {data.elements.map(item => <li className="item">{item}</li>)}
        </ul >
        <View id="data" show={data.ifShow}>
            <h1>这是一级段落的开头：</h1>
            <h2>这是二级段落的开头：</h2>
            <h3>这是三级段落的开头：</h3>
        </View>
        <button onclick={() => ViewShow.publish("data")}>展示</button>
        <List id="list" textColor={'#fff'} />
        </View>;
render(jsx, document.getElementById('root'));