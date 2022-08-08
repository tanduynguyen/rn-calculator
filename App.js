import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Main from './Main';
import {reducer} from './modules';

const store = createStore(reducer);

export default () => (
    <Provider store={store}>
        <Main />
    </Provider>
);