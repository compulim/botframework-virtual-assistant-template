import updateIn from 'simple-update-in';

import { OVERRIDE_TIMEZONE } from '../actions/overrideTimezone';
import { SET_TIMEZONE } from '../actions/setTimezone';

const DEFAULT_STATE = {
  actualName: undefined,
  actualOffset: undefined,
  name: undefined,
  offset: undefined,
  overrideName: undefined,
  overrideOffset: undefined
};

export default function (state = DEFAULT_STATE, { payload, type }) {
  if (type === OVERRIDE_TIMEZONE) {
    state = updateIn(state, ['overrideName'], () => payload.name);
    state = updateIn(state, ['overrideOffset'], () => payload.offset);
  } else if (type === SET_TIMEZONE) {
    state = updateIn(state, ['actualName'], () => payload.name);
    state = updateIn(state, ['actualOffset'], () => payload.offset);
  }

  state = updateIn(
    state,
    ['name'],
    () => state.overrideName || state.actualName
  );

  state = updateIn(
    state,
    ['offset'],
    () => typeof state.overrideOffset === 'number' ? state.overrideOffset : state.actualOffset
  );

  return state;
}
