import { combineReducers } from 'redux';

import cabinTemperature from './reducers/cabinTemperature';
import clock from './reducers/clock';
import cruiseControlSpeed from './reducers/cruiseControlSpeed';
import directLineOptions from './reducers/directLineOptions';
import distanceUnit from './reducers/distanceUnit';
import fanLevel from './reducers/fanLevel';
import geolocation from './reducers/geolocation';
import heading from './reducers/heading';
import language from './reducers/language';
import pairedPhone from './reducers/pairedPhone';
import temperatureUnit from './reducers/temperatureUnit';

export default combineReducers({
  cabinTemperature,
  clock,
  cruiseControlSpeed,
  directLineOptions,
  distanceUnit,
  fanLevel,
  geolocation,
  heading,
  language,
  pairedPhone,
  temperatureUnit
})
