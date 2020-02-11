import produce from 'immer';
export default function () {
    return {
        //reducers
        _handleActions(reducers, defaultState) {
            return function (state = defaultState, action) {
                let { type } = action;
                let ret = produce(state, draft => {
                    const reducer = reducers[type];
                    if (reducer) {
                        reducer(draft, action);
                    }
                });
                return ret;
            }
        }
    }
}
/**
 reducers=
{
        add(state) {
             state.number += 1;
            },
            minus(state) {
                return { number: state.number - 1 };
            }
        }
    }
 */