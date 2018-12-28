import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

import connectUsingTokenServer from './redux/actions/connectUsingTokenServer';
import createStore from './redux/createStore';

const store = createStore();

// TODO: Move it somewhere
store.dispatch(connectUsingTokenServer());

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
