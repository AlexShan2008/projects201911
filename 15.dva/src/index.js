import React from 'react';
import dva, { connect } from './dva';
import { Router, Route, Link, routerRedux } from './dva/router';
import createLoading from './dva-loading';
import dynamic from './dva/dynamic';
import { delay } from './utils';
import logger from './redux-logger';
import { persistStore, persistReducer } from './redux-persist';
import storage from './redux-persist/lib/storage';//默认是localStorage
import undoable, { ActionCreators } from './redux-undo';
import { PersistGate } from './redux-persist/integration/react';
//import { produce } from 'immer';
import immer from './dva-immer';
//import { createLogger } from 'redux-logger';
let { ConnectedRouter, push } = routerRedux;
const persistConfig = {
    key: 'root',//存放到localStorage的时候key
    storage,
}

let app = dva({
    //initialState: localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined,
    //它是用来封装和增强reducer
    onReducer: reducer => {
        let undoReducer = undoable(reducer);
        let rootReducer = persistReducer(persistConfig, undoReducer);
        return function (state, action) {
            let newState = rootReducer(state, action);
            return { ...newState, router: newState.present.router }
        }
    },
    //跟别的钩子不一样
    extraEnhancers: [
        createStore => (...args) => {
            const store = createStore(...args);
            let persistor = persistStore(store);
            store.persistor = persistor;
            return store;
        }
    ],
    onError(e) {
        alert(e);
    }
});
//use 就是使用插件或者说钩子
//app.use({ onAction: createLogger() });
app.use(createLoading());
app.use({
    onAction: logger
});
app.use({
    //当状态发生变化之后会执行监听函数
    onStateChange(state) {
        //localStorage.setItem('state', JSON.stringify(state));
    }
});
app.use(immer());
app.model({
    namespace: 'counter',
    state: { number: 0 },
    reducers: {
        add(state) {// "counter/add"
            //return { number: state.number + 1 };
            /*  return produce(state, draftState => {
                 draftState.number += 1;
             }); */
            state.number += 1;
        },
        minus(state) {// "counter/add"
            return { number: state.number - 1 };
        }
    },
    effects: {
        *asyncAdd(action, { put }) {
            yield delay(3000);
            throw new Error('我是Counter asyncAdd的错误');
            yield put({ type: 'add' });
        }
    },
    subscriptions: {
        changeTitle({ history, dispatch }, done) {
            history.listen(({ pathname }) => {
                document.title = pathname;
            });
            //done('我是subscriptions changeTitle changeTitle错误');
        }
    }
});
function Counter(props) {
    return (
        <div>
            <p>{props.loading ? <span>执行中</span> : props.number}</p>
            <button onClick={() => props.dispatch({ type: "counter/add" })}>加1</button>
            <button disabled={props.loading} onClick={() => props.dispatch({ type: "counter/asyncAdd" })}>异步+</button>
            <button onClick={() => props.dispatch(ActionCreators.undo())}>撤消</button>
            <button onClick={() => props.dispatch(ActionCreators.redo())}>重做</button>
        </div>
    )
}
const ConnectedCounter = connect(
    (state) => ({
        ...state.present.counter,
        loading: state.present.loading.models.counter
    })
)(Counter);
const Home = (props) => (
    <div>
        <p>Home</p>
        <button onClick={() => props.dispatch(push('/counter'))}>跳到/counter</button>
    </div>
)
const ConnectedHome = connect(
    (state) => state.present
)(Home);
const UsersPage = dynamic({
    app,
    models: () => [import(/* webpackChunkName: "users" */'./models/users')],
    component: () => import(/* webpackChunkName: "users" */'./routes/UsersPage')
});
app.router(({ history, app }) => {
    //let persistor = persistStore(app._store);
    return (
        <PersistGate persistor={app._store.persistor}>
            <ConnectedRouter history={history}>
                <>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/counter">counter</Link></li>
                        <li><Link to="/users">users</Link></li>
                    </ul>
                    <Route path="/" exact component={ConnectedHome} />
                    <Route path="/counter" component={ConnectedCounter} />
                    <Route path="/users" component={UsersPage} />
                </>
            </ConnectedRouter>
        </PersistGate>
    )

});
app.start('#root');


window.app = app;
/**
 *
 * Error: Could not find router reducer in state tree, it must be mounted under "router"
 * {
 *    router,
 *    counter,
 *    users
 * }
 * {
 *   preset:[],
 *   present:{router,counter,users}
 *   future:[]
 * }
 */