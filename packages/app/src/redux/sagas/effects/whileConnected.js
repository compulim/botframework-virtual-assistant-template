import { cancel, fork, take } from 'redux-saga/effects';

import { SET_CONNECTED } from '../../actions/setConnected';

export default function* (fn) {
  for (;;) {
    yield take(({ payload, type }) => type === SET_CONNECTED && payload.connected);

    const task = yield fork(fn);

    yield take(({ payload, type }) => type === SET_CONNECTED && !payload.connected);
    yield cancel(task);
  }
}
