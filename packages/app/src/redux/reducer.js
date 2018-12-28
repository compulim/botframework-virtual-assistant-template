import { combineReducers } from 'redux';

import connected from './reducers/connected';
import directLineOptions from './reducers/directLineOptions';
import language from './reducers/language';

export default combineReducers({
  connected,
  directLineOptions,
  language
})
