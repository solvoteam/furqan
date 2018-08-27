import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import './bootstrap';

import { store, history } from './app/core';

import App from './app/App';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);
