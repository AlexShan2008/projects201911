import React, { useEffect, useState } from 'react';
/**
 * useEffect是一个封装后的钩子，可以实现 didMount didUpdate willUnMount的功能
 * 希望通过class组件改变标题
 * 保持窗口标题和数字一致
 */
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 }
    }
    componentDidMount() {
        document.title = this.state.number + '';
    }
    componentDidUpdate() {
        document.title = this.state.number + '';
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => this.setState(prevState => ({ number: prevState.number + 1 }))}>+</button>
            </div>
        )
    }
}
function Counter2() {
    let [state, setState] = useState({ number: 0 });
    //useEffect里的函数会在每次函数组件渲染的时候执行
    useEffect(() => {
        document.title = state.number + '';
    }, []);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => setState(prevState => ({ number: prevState.number + 1 }))}>+</button>
        </div>
    )
}

export default Counter2;