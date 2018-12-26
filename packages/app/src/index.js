import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import connect from './redux/actions/connect';
import createStore from './redux/createStore';
import disconnect from './redux/actions/disconnect';

const store = createStore();

// TODO: Move it somewhere
store.dispatch(connect());

setTimeout(() => {
  store.dispatch(disconnect());
}, 5000);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
