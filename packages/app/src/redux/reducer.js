import { combineReducers } from 'redux';

import cabinTemperature from './reducers/cabinTemperature';
import clock from './reducers/clock';
import cruiseControlSpeed from './reducers/cruiseControlSpeed';
import directLineOptions from './reducers/directLineOptions';
import distanceUnit from './reducers/distanceUnit';
import exteriorTemperature from './reducers/exteriorTemperature';
import fanLevel from './reducers/fanLevel';
import geolocation from './reducers/geolocation';
import heading from './reducers/heading';
import language from './reducers/language';
import pairedPhone from './reducers/pairedPhone';
import temperatureUnit from './reducers/temperatureUnit';
import timezone from './reducers/timezone';

export default combineReducers({
  cabinTemperature,
  clock,
  cruiseControlSpeed,
  directLineOptions,
  distanceUnit,
  exteriorTemperature,
  fanLevel,
  geolocation,
  heading,
  language,
  pairedPhone,
  temperatureUnit,
  timezone
})
