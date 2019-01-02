import { css } from 'glamor';
// import { connect } from 'react-redux';
import React from 'react';

import CabinTemperature from '../Connected/CabinTemperature';
import ExteriorTemperature from '../Connected/ExteriorTemperature';
import FanLevel from '../Connected/FanLevel';
import PairedPhone from '../PairedPhone';
import UIFabricIcon from '../Bare/UIFabricIcon';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',

  '& > .va__row': {
    alignItems: 'center',
    display: 'flex',
    minHeight: 20,
    padding: 10
  },

  '& > .va__profilerow': {
    backgroundColor: 'Black',
    color: 'White'
  },

  '& > .va__temperaturerow': {
    backgroundColor: '#666',
    color: 'White',
    justifyContent: 'space-around',

    '& > .va__temperaturecolumn': {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',

      '& > .va__temperature': {
        fontSize: 30
      }
    }
  },

  '& > .va__fanrow': {
    backgroundColor: '#669',
    color: 'White'
  }
});

export default () =>
  <div className={ ROOT_CSS }>
    <div className="va__row va__profilerow">
      <UIFabricIcon icon="Contact" />
      &nbsp;
      <PairedPhone />
    </div>
    <div className="va__row va__temperaturerow">
      <div className="va__temperaturecolumn">
        <CabinTemperature className="va__temperature" />
        <div>Cabin Temp</div>
      </div>
      <div className="va__temperaturecolumn">
        <ExteriorTemperature className="va__temperature" />
        <div>Exterior Temp</div>
      </div>
    </div>
    <div className="va__row va__fanrow">
      <FanLevel />
    </div>
  </div>
