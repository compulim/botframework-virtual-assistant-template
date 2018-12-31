import { SET_DISTANCE_UNIT } from '../actions/setDistanceUnit';

export default function (state = 'mile', { payload, type }) {
  if (type === SET_DISTANCE_UNIT) {
    state = payload.distanceUnit === 'kilometer' ? 'kilometer' : 'mile';
  }

  return state;
}
