import { applyMiddleware, createStore } from 'redux';
import onErrorResumeNext from 'on-error-resume-next';
import thunk from 'redux-thunk';
import updateIn from 'simple-update-in';

import createClockMiddleware from './middleware/clock';
import createGeolocationMiddleware from './middleware/geolocation';
import createHeadingMiddleware from './middleware/heading';
import reducer from './reducer';

const PERSISTED_STATE_KEY = 'REDUX_STORE';

export default function () {
  const initialState = onErrorResumeNext(() => JSON.parse(window.sessionStorage.getItem(PERSISTED_STATE_KEY)), {});
  const store = createStore(
    reducer,
    updateIn(initialState, ['language', 'languageCodeFromURL'], () => new URLSearchParams(window.location.search).get('locale')),
    applyMiddleware(
      thunk,
      createClockMiddleware(),
      createGeolocationMiddleware(),
      createHeadingMiddleware()
    )
  );

  // store.subscribe(() => console.log(store.getState()));

  store.subscribe(() => {
    const {
      directLineSecret,
      geolocation,
      language,
      speechServicesSubscriptionKey
    } = store.getState();

    const persistedState = {
      directLineSecret,
      geolocation,
      language,
      speechServicesSubscriptionKey
    };

    window.sessionStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(persistedState));
  });

  return store;
}
