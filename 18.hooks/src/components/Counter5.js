import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';

//useEffect的销毁
function Counter1() {
    let [state, setState] = useState({ number: 0 });
    //useEffect里面方法会有返回值，返回值是一个函数，一般用来执行清理动作
    //每次执行effect之前都会执行此unEffect函数
    useEffect(() => {
        let $timer = setInterval(() => {
            setState(prevState => ({ number: prevState.number + 1 }));
        }, 1000);
        return () => {
            clearInterval($timer);
        }
    }, []);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => setState(prevState => ({ number: prevState.number + 1 }))}>+</button>
        </div>
    )
}

/* function useImperativeHandle(parentRef, handler) {
    parentRef.current = handler();
} */
//useRef React.createRef
//一定是第个参数
function Child(props, parentRef) {
    let inputRef = useRef();
    useImperativeHandle(parentRef, () => (
        {
            focus() {
                inputRef.current.focus();
            },
            setValue(newVal) {
                inputRef.current.value = newVal;
            }
        }
    ));
    return (
        <>
            <input type="text" ref={inputRef} />
        </>
    )

}
let ForwardedChild = forwardRef(Child);
function Parent() {
    let [number, setNumber] = useState(0);
    let parentRef = useRef();//{current:null} //每次都会返回同一个对象
    function getFocus() {
        //希望在父组件只能调用focus方法，其它的方法都不能调用
        parentRef.current.focus();//current是此input框 的真实DOM元素
        //inputRef.current.value = 'something';
        parentRef.current.setValue('something');
    }
    return (
        <>
            <ForwardedChild ref={parentRef} />
            <button onClick={() => setNumber(prevState => prevState + 1)}>+</button>
            <button onClick={getFocus}>获得焦点</button>
        </>
    )

}

function Counter3() {
    let [color, setColor] = useState('red');
    useLayoutEffect(() => {
        console.log("useLayoutEffect", document.getElementById('myDiv').style.backgroundColor);
        alert('useLayoutEffect' + color);
    });
    useEffect(() => {
        console.log("useEffect", document.getElementById('myDiv').style.backgroundColor);
        alert('useEffect' + color);
    });
    return (
        <>
            <div id="myDiv" style={{ backgroundColor: color }}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    )

}
export default Counter3;
/**
 * index.js:1 Warning:
 * Child: `ref` is not a prop.
 * Trying to access it will result in `undefined` being returned.
 * If you need to access the same value within the child component,
 * you should pass it as a different prop.
 */