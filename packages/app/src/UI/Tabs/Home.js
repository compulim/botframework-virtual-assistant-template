import { css } from 'glamor';
// import { connect } from 'react-redux';
import React from 'react';

import CabinTemperature from '../Connected/CabinTemperature';
import Clock from '../Connected/Clock';
import Compass from '../Connected/Compass';
import CruiseControlSpeedSlider from '../Connected/CruiseControlSpeedSlider';
import ExteriorTemperature from '../Connected/ExteriorTemperature';
import FanLevel from '../Connected/FanLevel';
import Latitude from '../Connected/Latitude';
import Longitude from '../Connected/Longitude';
import NavigationDestinationAddress from '../Connected/NavigationDestinationAddress';
import NavigationDestinationName from '../Connected/NavigationDestinationName';
import PairedPhone from '../PairedPhone';
import Speed from '../Connected/Speed';
import Speedometer from '../Connected/Speedometer';
import TimezoneName from '../Connected/TimezoneName';
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
  },

  '& > .va__speedrow': {
    backgroundColor: '#CCC',
    fontWeight: 200,
    justifyContent: 'stretch',

    '& > .va__speed': {
      flex: 1,
      fontSize: 80,
      textAlign: 'center'
    },

    '& > .va__speedometer': {
      height: 100,
      width: 200
    }
  },

  '& > .va__cruisecontrolrow': {
    alignItems: 'center',
    backgroundColor: '#999',
    color: 'White',

    '& > *:not(:last-child)': {
      marginRight: '.5em'
    },

    '& > .va__cruisecontrolspeedslider': {
      flex: 1
    }
  },

  '& > .va__clockrow': {
    alignItems: 'flex-end',
    backgroundColor: '#999',
    color: 'White',
    justifyContent: 'center',

    '& > .va__clock': {
      fontSize: 24,
      fontWeight: 200,
      lineHeight: '24px',
      marginRight: '.5em'
    },

    '& > .va__timezonename': {
      color: '#00c'
    }
  },

  '& > .va__navigationrow': {
    alignItems: 'center',
    backgroundColor: '#666',
    color: 'White',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0',
    textAlign: 'center',

    '& > .va__latlong': {
      alignItems: 'center',
      alignSelf: 'stretch',
      display: 'flex',
      height: 40,
      justifyContent: 'space-between',
      paddingTop: 10,

      '& > .va__latitude, & > .va__longitude': {
        backgroundColor: 'Black',
        flex: 1,
        padding: 10
      },

      '& > .va__compass': {
        fontSize: 32,
        width: 64
      }
    }
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
    <div className="va__row va__speedrow">
      <Speed className="va__speed" />
      <Speedometer className="va__speedometer" />
    </div>
    <div className="va__row va__cruisecontrolrow">
      <UIFabricIcon icon="SpeedHigh" />
      <span>Cruise Control</span>
      <CruiseControlSpeedSlider className="va__cruisecontrolspeedslider" />
    </div>
    <div className="va__row va__clockrow">
      <Clock className="va__clock" />
      <TimezoneName className="va__timezonename" />
    </div>
    <div className="va__row va__navigationrow">
      <div>Destination:</div>
      <NavigationDestinationName className="va__navigationdestinationname" />
      <NavigationDestinationAddress />
      <div className="va__latlong">
        <span className="va__latitude">LAT <Latitude /></span>
        <Compass className="va__compass" />
        <span className="va__longitude">LONG <Longitude /></span>
      </div>
    </div>
  </div>
