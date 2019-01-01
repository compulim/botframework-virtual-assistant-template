import { css } from 'glamor';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';

import Home from './Tabs/Home';

import ChromelessButton from './Bare/ChromelessButton';
import UIFabricIcon from './Bare/UIFabricIcon';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',

  '& > .va__tabbar': {
    backgroundColor: '#66C',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
  }
});

const TAB_BAR_BUTTON_CSS = css({
  borderRadius: '20%',
  color: 'White',
  fontSize: 20,
  height: 40,
  padding: 5,
  width: 40,

  '&.active': {
    backgroundColor: 'rgba(255, 255, 255, .3)'
  }
});

const DashboardControls = () =>
  <div className={ ROOT_CSS }>
    <Home />
    <div className="va__tabbar">
      <ChromelessButton className={ TAB_BAR_BUTTON_CSS }>
        <UIFabricIcon icon="Snowflake" />
      </ChromelessButton>
      <ChromelessButton className={ TAB_BAR_BUTTON_CSS }>
        <UIFabricIcon icon="Car" />
      </ChromelessButton>
      <ChromelessButton className={ TAB_BAR_BUTTON_CSS }>
        <UIFabricIcon icon="MapPin" />
      </ChromelessButton>
      <ChromelessButton className={ TAB_BAR_BUTTON_CSS }>
        <UIFabricIcon icon="MusicInCollection" />
      </ChromelessButton>
      <ChromelessButton className={ TAB_BAR_BUTTON_CSS }>
        <UIFabricIcon icon="CellPhone" />
      </ChromelessButton>
      <ChromelessButton className={ classNames(TAB_BAR_BUTTON_CSS + '', 'active') }>
        <UIFabricIcon icon="Home" />
      </ChromelessButton>
    </div>
  </div>

export default connect(
  () => ({})
)(DashboardControls)
