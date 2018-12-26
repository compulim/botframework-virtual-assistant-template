import { SET_CONNECTED } from '../actions/setConnected';

export default function (state = false, { payload, type }) {
  if (type === SET_CONNECTED) {
    state = !!payload.connected;
  }

  return state;
}
