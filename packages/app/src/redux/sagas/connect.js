import { call, cancel, fork, put, take } from 'redux-saga/effects';

import { CONNECT } from '../actions/connect';
import { DISCONNECT } from '../actions/disconnect';
import setConnected from '../actions/setConnected';

function forever() {
  return new Promise(() => 0);
}

export default function* () {
  for (;;) {
    yield take(CONNECT);

    const task = yield fork(function* () {
      try {
        const res = yield call(fetch, '/api/directline/token', { method: 'POST' });

        if (res.ok) {
          yield put(setConnected(true));
        }

        yield call(forever);
      } finally {
        yield put(setConnected(false));
      }
    });

    yield take(DISCONNECT);
    yield cancel(task);
  }
}
