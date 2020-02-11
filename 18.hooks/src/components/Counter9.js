import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import './index.css';
function useAnimation(initialClassName) {
    let [className, setClassName] = useState(initialClassName);
    let [state, setState] = useState('');
    useEffect(() => {
        if (state === 'bigger') {
            setClassName(`${initialClassName} ${initialClassName}-bigger`);
            setTimeout(() => {
                setClassName(initialClassName);
            }, 1000)
        } else if (state === 'smaller') {
            setClassName(`${initialClassName} ${initialClassName}-smaller`);
            setTimeout(() => {
                setClassName(initialClassName);
            }, 1000)
        }
    }, [state]);
    //.circle   .circle.circle-bigger
    function bigger() {
        setState('bigger');
    }
    function smaller() {
        setState('smaller');
    }
    return [className, bigger, smaller];
}
function App() {
    const [className, bigger, smaller] = useAnimation('circle');
    return (
        <div>
            <button onClick={bigger}>bigger</button>
            <button onClick={smaller}>smaller</button>
            <div className={className}></div>
        </div>
    )
}
export default App;