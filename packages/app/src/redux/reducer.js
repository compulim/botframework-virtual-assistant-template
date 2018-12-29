import { combineReducers } from 'redux';

import cabinTemperature from './reducers/cabinTemperature';
import cruiseControlSpeed from './reducers/cruiseControlSpeed';
import directLineOptions from './reducers/directLineOptions';
import language from './reducers/language';
import pairedPhone from './reducers/pairedPhone';

export default combineReducers({
  cabinTemperature,
  cruiseControlSpeed,
  directLineOptions,
  language,
  pairedPhone
})
