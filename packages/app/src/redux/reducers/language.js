import updateIn from 'simple-update-in';

import { OVERRIDE_LANGUAGE_CODE } from '../actions/overrideLanguageCode';
import { SET_LANGUAGE_CODE } from '../actions/setLanguageCode';

const DEFAULT_STATE = {
  actualLanguageCode: 'en-US',
  languageCode: 'en-US',
  languageCodeFromURL: null,
  overrodeLanguageCode: null,
};

export default function (state = DEFAULT_STATE, { payload, type }) {
  if (type === OVERRIDE_LANGUAGE_CODE) {
    state = updateIn(state, ['overrodeLanguageCode'], () => payload.languageCode);
  } else if (type === SET_LANGUAGE_CODE) {
    state = updateIn(state, ['actualLanguageCode'], () => payload.languageCode);
  }

  state = updateIn(state, ['languageCode'], () => state.overrodeLanguageCode || state.languageCodeFromURL || state.actualLanguageCode || 'en-US');

  return state;
}
