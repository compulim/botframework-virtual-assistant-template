import updateIn from 'simple-update-in';

import { OVERRIDE_TIMEZONE } from '../actions/overrideTimezone';
import { SET_TIMEZONE } from '../actions/setTimezone';

const DEFAULT_STATE = {
  actualName: undefined,
  overrideName: undefined
};

export default function (state = DEFAULT_STATE, { payload, type }) {
  if (type === OVERRIDE_TIMEZONE) {
    state = updateIn(state, ['overrideName'], () => payload.name);
  } else if (type === SET_TIMEZONE) {
    state = updateIn(state, ['actualName'], () => payload.name);
  }

  state = updateIn(
    state,
    ['name'],
    () => state.overrideName || state.actualName
  );

  return state;
}
