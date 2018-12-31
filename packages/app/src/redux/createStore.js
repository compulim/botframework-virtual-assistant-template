import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import createClockMiddleware from './middleware/clock';
import createGeolocationMiddleware from './middleware/geolocation';
import createHeadingMiddleware from './middleware/heading';
import reducer from './reducer';

export default function () {
  const store = createStore(
    reducer,
    applyMiddleware(
      thunk,
      createClockMiddleware(),
      createGeolocationMiddleware(),
      createHeadingMiddleware(),
      () => next => action => {
        console.log(action);

        return next(action);
      }
    )
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
}
