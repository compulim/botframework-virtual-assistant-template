import { css } from 'glamor';
import { connect } from 'react-redux';
import React from 'react';

import Clock from './Connected/Clock';
import Compass from './Connected/Compass';
import CruiseControlSlider from './CruiseControlSlider';
import DashboardButtons from './DashboardButtons';
import DummySlider from './Bare/DummySlider';
import Latitude from './Connected/Latitude';
import Longitude from './Connected/Longitude';
import MediaControl from './Bare/MediaControl';
import Meter from './Bare/Meter';
import PairedPhone from './PairedPhone';
import Speedometer from './Connected/Speedometer';
import Temperature from './Bare/Temperature';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: 10
});

const DashboardControls = () =>
  <div className={ ROOT_CSS }>
    <PairedPhone />
    <CruiseControlSlider />
    <Speedometer />
    <DummySlider />
    <DashboardButtons />
    <Meter />
    <Compass />
    <MediaControl />
    <Latitude /> <Longitude />
    <Temperature celsius={ 21.5 } />
    <Clock />
  </div>

export default connect(
  () => ({})
)(DashboardControls)
