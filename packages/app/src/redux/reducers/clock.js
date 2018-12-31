import updateIn from 'simple-update-in';

import { SET_CLOCK } from '../actions/setClock';
import { OVERRIDE_CLOCK } from '../actions/overrideClock';

const NOW = Date.now();
const DEFAULT_STATE = {
  actualDate: NOW,
  overrideDate: undefined,
  date: NOW
};

export default function (state = DEFAULT_STATE, { payload, type }) {
  if (type === OVERRIDE_CLOCK) {
    state = updateIn(state, ['overrideDate'], () => payload.date);
  } else if (type === SET_CLOCK) {
    state = updateIn(state, ['actualDate'], () => payload.date);
  }

  state = updateIn(
    state,
    ['date'],
    () => typeof state.overrideDate === 'number' ? state.overrideDate : state.actualDate
  );

  return state;
}
