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
  const searchParams = new URLSearchParams(window.location.search);
  let initialState = onErrorResumeNext(() => JSON.parse(window.sessionStorage.getItem(PERSISTED_STATE_KEY)), {});

  initialState = updateIn(initialState, ['language', 'languageCodeFromURL'], () => searchParams.get('locale'));
  initialState = updateIn(initialState, ['directLineSecret'], () => searchParams.get('s'));
  initialState = updateIn(initialState, ['geolocation', 'overrodeLatitude'], () => +searchParams.get('lat'));
  initialState = updateIn(initialState, ['geolocation', 'overrodeLongitude'], () => +searchParams.get('long'));

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      createClockMiddleware(),
      createGeolocationMiddleware(),
      createHeadingMiddleware()
    )
  );

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
