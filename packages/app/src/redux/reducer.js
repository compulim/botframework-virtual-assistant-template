import { combineReducers } from 'redux';

import cabinTemperature from './reducers/cabinTemperature';
import clock from './reducers/clock';
import cruiseControlSpeed from './reducers/cruiseControlSpeed';
import directLineOptions from './reducers/directLineOptions';
import geolocation from './reducers/geolocation';
import heading from './reducers/heading';
import language from './reducers/language';
import pairedPhone from './reducers/pairedPhone';

export default combineReducers({
  cabinTemperature,
  clock,
  cruiseControlSpeed,
  directLineOptions,
  geolocation,
  heading,
  language,
  pairedPhone
})
