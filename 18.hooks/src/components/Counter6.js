import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
/**
 * 自定义hook其实是一个函数，但是要以use开头
 * 自定义hook复用的是逻辑，而非状态
 * hook只能用在函数组件中或者自定义 hook里
 */
function useCounter() {
    let [number, setNumber] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setNumber(number => number + 1);
        }, 1000);
    }, []);
    return number;
}
function Counter1() {
    let number = useCounter();
    return (
        <div>{number}</div>
    )
}
function Counter2() {
    let number = useCounter();
    return (
        <div>{number}</div>
    )
}

function App() {
    return (
        <div>
            <Counter1 />
            <h1 />
            <Counter2 />
        </div>
    )
}
export default App;

/**
 *
 * React Hook "useState" is called in function "uCounter"
 * which is neither a React function component or a custom React Hook function
 */