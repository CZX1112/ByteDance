const ListAdd = {
    list: [],
    subscribe(cb) {
        this.list.push(cb);
    },
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};

const ListDel = {
    list: [],
    subscribe(cb) {
        this.list.push(cb);
    },
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};

const ViewShow = {
    list: [],
    subscribe(cb) {
        this.list.push(cb);
    },
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};

function Item(props) {
    return <li className="item" style={props.style}> {props.children} < a href="#" onClick={props.onRemoveItem} > X </a ></li >;
}

class View extends Component {
    constructor(props) {
        super(props);
        ViewShow.subscribe(this.handleShowSwitch.bind(this));
        this.state = { show: true };
        if ("show" in this.props) {
            this.state.show = this.props.show;
        }
    }
    handleShowSwitch(id) {
        if (typeof (this.props.id) !== "undefined" && this.props.id == id) {
            console.log(this.state);
            let tmpstate = JSON.parse(JSON.stringify(this.state));
            tmpstate.show = !tmpstate.show;
            console.log(tmpstate);
            this.setState(tmpstate);
        }
    }
    render() {
        return <div className="view" style={this.state.show ? this.props.style : "display: none"}>{this.props.children}</div>;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    text: '选项1',
                    color: 'red'
                },
                {
                    text: '选项2',
                    color: 'pink'
                },
                {
                    text: '选项3',
                    color: 'orange'
                },
                {
                    text: '选项4',
                    color: 'yellow'
                }
            ]
        }
        ListAdd.subscribe(this.handleAdd.bind(this));
        ListDel.subscribe(this.handleItemRemove.bind(this));
    }

    handleItemRemove(edata) {
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listdel"]) {
            this.setState({
                list: this.state.list.filter((item, i) => i !== edata["index"])
            });
        }
    }

    handleAdd(edata) {
        console.log(edata);
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listadd"]) {
            this.setState({
                list: [
                    ...this.state.list,
                    {
                        text: edata["value"]
                    }
                ]
            });
        }
    }

    render() {
        return <View>
            <ul className="list">
                {this.state.list.map((item, index) => {
                    return <Item style={{ background: item.color, color: this.props.textColor }} onRemoveItem={() => {
                        let tmp = { listdel: this.props.id, index: index };
                        logicWorker.postMessage(JSON.stringify(tmp));
                    }}>{item.text}</Item>
                })}
            </ul>
            <View>
                <input ref={(ele) => { this.ref = ele }} />
                <button onclick={() => {
                    let tmp = { listadd: this.props.id, value: this.ref.value };
                    logicWorker.postMessage(JSON.stringify(tmp));
                }}>Add</button>
            </View>
        </View>;
    }

}

var logicWorker;

if (typeof Worker !== "undefined") {
    if (typeof logicWorker == "undefined") {
        logicWorker = new Worker("logic.js");
    }
    logicWorker.onmessage = (e) => {
        console.log(e.data);
        var edata = JSON.parse(e.data);
        if ("listdel" in edata) {
            ListDel.publish(edata);
        }
        if ("listadd" in edata) {
            ListAdd.publish(edata);
        }
    };
} else {
    alert("程序错误");
}