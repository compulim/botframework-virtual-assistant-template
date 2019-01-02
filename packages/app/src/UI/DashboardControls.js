import { css } from 'glamor';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';

import Home from './Tabs/Home';
import Test from './Tabs/Test';

import setTab from '../redux/actions/setTab';

import TabBar from './Bare/TabBar';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end'
});

const ICONS = [
  'Snowflake',
  'Car',
  'MapPin',
  'MusicInCollection',
  'CellPhone',
  'TestBeaker',
  'Home'
];

const DashboardControls = ({
  className,
  setTab,
  tab
}) =>
  <div className={ classNames(
    ROOT_CSS + '',
    (className || '') + ''
  ) }>
    { tab === 'Home' && <Home /> }
    { tab === 'TestBeaker' && <Test /> }
    <TabBar
      icons={ ICONS }
      onClick={ setTab }
      value={ tab }
    />
  </div>

export default connect(
  ({ tab }) => ({ tab }),
  { setTab }
)(DashboardControls)
