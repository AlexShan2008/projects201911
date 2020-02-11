import React, { useRef, useCallback, memo, useMeme, useReducer } from 'react';
/**
 * useReducer
 * useState是一个语法糖 ，是useReducer的语法糖
 * react hooks 和redux 有关系 ？facebook把这个redux 作者挖到了facebook,专门开发hooks
 * 
 */
const ADD = 'ADD';
const MINUS = 'MINUS';

function reducer(state, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 };
        case MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
}
function initializer(initialArgs) {
    return { number: initialArgs };
}

function Counter1(props) {
    //state={number:0}
    let [state, dispatch] = useReducer(reducer, 0, initializer);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => dispatch({ type: ADD })}>+</button>
            <button onClick={() => dispatch({ type: MINUS })}>-</button>
        </div>
    )
}
/**
 * 什么时候用useState 什么时候用useReducer
 * 1.当你计算新状态的逻辑特别复杂的时候就合适 的useReducer
 * @param {*} initialState 
 */
function useState(initialState) {
    console.log('useState', useState);
    function reducer(state, action) {
        return { ...action.payload };
    }
    let [state, dispatch] = useReducer(reducer, initialState);
    function setState(newState) {
        dispatch({ type: 'SET_STATE', payload: newState });
    }
    return [state, setState];
}

function Counter2(props) {
    //state={number:0}
    let [state, setState] = useState({ number: 0 });
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => setState({ number: state.number + 1 })}>+</button>
            <button onClick={() => setState({ number: state.number - 1 })}>-</button>
        </div>
    )
}
export default Counter2;