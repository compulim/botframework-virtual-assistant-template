import { call } from 'redux-saga/effects';

import whileConnected from './effects/whileConnected';

function forever() {
  return new Promise(() => 0);
}

export default function* () {
  yield whileConnected(function* () {
    try {
      console.log('checkConnection: Connected');

      yield call(forever);
    } finally {
      console.log('checkConnection: Disconnected');
    }
  });
}
