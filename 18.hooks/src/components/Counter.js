import React, { useState, useRef, useCallback, memo, useMemo } from 'react';
class Counter1 extends React.Component {
    state = { number: 0, name: 'zhufeng' }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
            </div>
        )
    }
}
//函数组件是没有状态的
function Counter2(props) {
    //useState 会返回一个数组，第1个元素是当前状态 第2个元素是设置状态的方法
    //1.setState特点1可以修改状态 2.状态修改完成后组件会刷新
    //
    let [state, setState] = useState({ number: 0, name: 'zhufeng' });
    return (
        <div>
            <p>{state.name}:{state.number}</p>
            <button onClick={() => setState({ number: state.number + 1 })}>+</button>
        </div>
    )
}
/**
 * 1. 每次渲染都有自己的state 和props
 * 2. 每次渲染都有自己的事件处理函数
 * 3.  alert 会捕获点击按钮时的状态
 * 4.
 */
let lastState;
let lastAdd;
function Counter3(props) {
    //useRef和createRef区别在于，createRef永远返回一个新的对象。但是useRef返回永远是同一个对象
    //useRef返回都是上次的值 use核心作用就是在多次渲染的时候返回同一个对象，保持 不变
    //
    let numberRef = useRef();//useRef 和React.createRef()像，都是返回一个 {current:null}
    let [value, setValue] = useState('');
    let [state, setState] = useState({ number: 0 });
    console.log('lastState===state', lastState === state);
    lastState = state;
    const add = () => {
        setState({ number: state.number + 1 });
        //给  ref.current赋值组件不会刷新
        numberRef.current = { number: state.number + 1 };
    }
    console.log('lastAdd===add', lastAdd === add);
    lastAdd = add;
    function showState() {
        setTimeout(() => {
            alert(JSON.stringify(numberRef.current));
        }, 3000);
    }
    function asyncAdd() {
        setTimeout(() => {
            //如果setState的时候传的是一个函数的话,始终就可以基于最新的状态去修改了
            setState((lastState) => ({ number: lastState.number + 1 }));
        }, 1000);
    }
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={add}>+</button>
            <button onClick={asyncAdd}>asyncAdd</button>
            <button onClick={showState}>showState</button>
            <input value={value} onChange={event => setValue(event.target.value)} ></input>
        </div>
    )
}
function sum() {
    console.log('sum');
    return Math.random();
}
//惰性初始化
function Counter4(props) {
    //初始化函数只会第一次渲染的时候执行一次，以后将不再执行
    /* let [state, setState] = useState(() => {
        console.log('useState');
        return { number: 0 };
    });
    */

    //const [count, setCount] = useState(() => sum());
    const [count, setCount] = useState(sum());
    const add = () => {
        setCount(prevState => (prevState + 1));
    }
    return (
        <div>
            <p>{count}</p>
            <button onClick={add}>+</button>
        </div>
    )
}

/**
 * useState性能优化 pureComponent shouldComponentUpdate 
 * Object.js
 * @param {*} props 
 */
function Counter5(props) {
    const [count, setCount] = useState({ name: "计数器", number: 0 });
    console.log('Counter5 render');
    return (
        <div>
            <p>{count.name}:{count.number}</p>
            <button onClick={() => setCount({ ...count, number: count.number + 1 })}>+</button>
            <button onClick={() => setCount(count)}>setCount</button>
        </div>
    )
}
/**
 * 优化 减少对象和函数创建
 */
let previousAdd;

/* let lastCallback;
let lastDependencies;
function useCallback(callback, dependencies) {
    if (!lastCallback || dependencies!=lastDependencies) {
        lastCallback = callback;
        lastDependencies = dependencies;
    }
    return lastCallback;
} */
/* function getInitialState() {
    for (let i = 0; i < 10000000; i++) {

    }
    return { number: 0 };
} */

function App() {
    let [state, setState] = useState({ number: 0 });
    let [value, setValue] = useState('');
    console.log('render App');
    //本意是地函数进行缓存
    let add = useCallback(() => {
        setState({ number: state.number + 1 });
    }, state);//useCallback第2个参数是依赖的变量的数组 当数组中变量发生改变后，就会重新生成生成新的函数
    console.log('previousAdd===add', previousAdd === add);
    previousAdd = add;

    return (
        <div>
            <p>{state.number}</p>
            <button onClick={add}>+</button>
            <input value={value} onChange={event => setValue(event.target.value)} />
        </div>
    )
}
//memo useMemo

function MyCounter({ onButtonClick, data }) {
    console.log('MyCounter render');
    return (
        <div>
            <p>{data.number}</p>
            <button onClick={onButtonClick}>+</button>
        </div>
    )
}
//memo  memory 记住 返回的新组件，如果组件的属性不改变，则不刷新  类 shouldComponentUpdate
let MemoMyCounter = memo(MyCounter);
function App2() {
    let [state, setState] = useState({ number: 0 });
    let [value, setValue] = useState('');
    console.log('render App');
    //本意是地函数进行缓存
    let onButtonClick = useCallback(() => {
        setState({ number: state.number + 1 });
    }, [state]);//useCallback第2个参数是依赖的变量的数组 当数组中变量发生改变后，就会重新生成生成新的函数
    //console.log('previousAdd===add', previousAdd === add);
    //previousAdd = add;
    //let data = { number: state.number };
    let data = useMemo(() => ({ number: state.number }), [state]);
    //let a = { x: 1 };
    return (
        <div>
            <input value={value} onChange={event => setValue(event.target.value)} />
            <MemoMyCounter onButtonClick={onButtonClick} data={data} />
        </div>
    )
}

function App3() {
    //React Hook "useState" is called conditionally. 
    //React Hooks must be called in the exact same order in every component render 
    let [number, setNumber] = useState(0);
    let [name, setName] = useState('zhufeng');
    /*  if (number % 2 == 0) {
 
     }
     while (let i = 1; i < 3; i++) {
         let [name, setName] = useState('zhufeng');
     }
     function add() {
         let [name, setName] = useState('zhufeng');
     } */
    return (
        <div>
            {number}{name}
        </div>
    )
}
export default App3;