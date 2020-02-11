
let lastState;
function useState(initialState) {
    if (!lastState) {
        if (typeof initialState === 'function') {
            lastState = initialState();
        } else {
            lastState = initialState;
        }
    }

    function setState(newState) {
        lastState = newState
    }
    return [lastState, setState];
}
const useState = (function () {

})();
function Counter() {
    let [state, setState] = useState(0);

}

const [count, setCount] = useState(() => sum());
const [count, setCount] = useState(sum());
function sum() {
    return 1 + 2;
}
