import { SET_LANGUAGE } from '../actions/setLanguage';

export default function (state = 'en-US', { payload, type }) {
  if (type === SET_LANGUAGE) {
    state = payload.language;
  }

  return state;
}
