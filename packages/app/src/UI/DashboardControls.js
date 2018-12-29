import { css } from 'glamor';
import { connect } from 'react-redux';
import React from 'react';

import Compass from './Bare/Compass';
import CruiseControlSlider from './CruiseControlSlider';
import DashboardButtons from './DashboardButtons';
import DummySlider from './Bare/DummySlider';
import MediaControl from './Bare/MediaControl';
import PairedPhone from './PairedPhone';

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
    <DummySlider />
    <DashboardButtons />
    <Compass />
    <MediaControl />
  </div>

export default connect(
  () => ({})
)(DashboardControls)
