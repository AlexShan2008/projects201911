import React, { useState, useRef, useCallback, memo, useMeme, useReducer, useContext } from 'react';
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
/**
 * useContext
 */
let Context = React.createContext();
function Counter(props) {
    //useContext 可以从 Context拿到向Provider里传的value值
    let [state, dispatch] = useContext(Context);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => dispatch({ type: ADD })}>+</button>
            <button onClick={() => dispatch({ type: MINUS })}>-</button>
        </div>
    )
}
function App() {
    let [state, dispatch] = useReducer(reducer, { number: 0 });
    return (
        <Context.Provider value={[state, dispatch]}>
            <Counter />
        </Context.Provider>
    )
}
export default App;