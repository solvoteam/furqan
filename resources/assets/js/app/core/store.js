import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export const configureStore = initialState => {
    const store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk, routerMiddleware(history)),
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    // TODO in test version
    window.store = store;

    return store;
};
