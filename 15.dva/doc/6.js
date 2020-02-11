let { produce } = require('immer');
let baseState = [
    { id: 1, name: 'zhufeng' },
    { id: 2, name: 'jiagou' }
]
let nextState = produce(baseState, draftState => {
    draftState[0].name = 'zhufeng2';
    draftState.push({ id: 3, name: 'xueyuan' });
});
console.log(nextState);

