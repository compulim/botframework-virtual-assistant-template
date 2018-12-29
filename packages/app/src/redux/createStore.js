import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

export default function () {
  const store = createStore(
    reducer,
    applyMiddleware(
      thunk,
      () => next => action => {
        console.log(action);

        return next(action);
      }
    )
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
}
