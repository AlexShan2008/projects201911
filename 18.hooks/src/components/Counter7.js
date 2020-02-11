import React, { useReducer, useEffect } from 'react';

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

function useLogger(reducer, initialArg, initializer) {
    let [state, dispatch] = useReducer(reducer, initialArg, initializer);
    let dispatchWithLogger = (action) => {
        console.log('prev state', state);
        dispatch(action);
    }
    useEffect(() => {
        console.log('next state', state);
    }, [state]);
    return [state, dispatchWithLogger];
}
function usePromise(reducer, initialArg, initializer) {
    let [state, dispatch] = useReducer(reducer, initialArg, initializer);
    let dispatchWithPromise = (action) => {
        if (action.payload && action.payload.then && typeof action.payload.then == 'function') {
            action.payload.then(p => {
                dispatchWithPromise({
                    ...action,
                    payload: p
                });
            });
        } else {
            dispatch(action);
        }
    }
    return [state, dispatchWithPromise];
}
function useThunk(reducer, initialArg, initializer) {
    let [state, dispatch] = useReducer(reducer, initialArg, initializer);
    let dispatchWithThunk = (action) => {
        if (typeof action === 'function') {
            action(dispatchWithThunk, () => state);
        } else {
            dispatch(action);
        }
    }
    return [state, dispatchWithThunk];
}
function useAll(reducer, initialArg, initializer) {
    let [state, dispatch] = useReducer(reducer, initialArg, initializer);
    let newDispatch = (action) => {
        if (typeof action === 'function') {
            action(newDispatch, () => state);
        } else if (action.payload && action.payload.then && typeof action.payload.then == 'function') {
            action.payload.then(p => {
                newDispatch({
                    ...action,
                    payload: p
                });
            });
        } else {
            console.log('prev state', state);
            dispatch(action);
        }
    }
    useEffect(() => {
        console.log('next state', state);
    }, [state]);
    return [state, newDispatch];
}
let initialArg = 0;
function Counter() {
    let [state, dispatch] = useAll(reducer, initialArg, initializer);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => dispatch({ type: ADD })}>+</button>
            <button onClick={() => dispatch({
                type: ADD,
                payload: new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({});
                    }, 1000);
                })
            })}>promise+1</button>
            <button onClick={() => dispatch(function (dispatchWithThunk, getState) {
                setTimeout(() => {
                    console.log('getState', getState());//打印当前的状态
                    dispatchWithThunk({ type: ADD });
                }, 1000);
            })}>thunk+</button>
            <button onClick={() => dispatch({ type: MINUS })}>-</button>
        </div>
    )
}
export default Counter;
/**
 * logger 状态变化前打一次，状态变化后打印一次日志  redux-logger
 */