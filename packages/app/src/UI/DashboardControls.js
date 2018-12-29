import { css } from 'glamor';
import { connect } from 'react-redux';
import React from 'react';

import CruiseControlSlider from './CruiseControlSlider';
import DashboardButtons from './DashboardButtons';
import PairedPhone from './PairedPhone';
import DummySlider from './Bare/DummySlider';

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
  </div>

export default connect(
  () => ({})
)(DashboardControls)
