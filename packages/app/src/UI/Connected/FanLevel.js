import { connect } from 'react-redux';
import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import setFanLevel from '../../redux/actions/setFanLevel';
import Slider from '../Bare/Slider';

const ROOT_CSS = css({
  alignItems: 'center',
  display: 'flex',
  width: '100%',

  '> .va__fanlevelslider': {
    flex: 1,
    marginRight: 10
  }
});

const FanLevel = ({
  className,
  fanLevel,
  setFanLevel
}) =>
  <div className={ classNames(
    ROOT_CSS + '',
    (className || '') + ''
  ) }>
    <Slider
      className="va__fanlevelslider"
      onChange={ setFanLevel }
      value={ (fanLevel - 1) / 4 }
    />
    <span>{ fanLevel }</span>
  </div>

export default connect(
  ({ fanLevel }) => ({ fanLevel }),
  { setFanLevel: value => setFanLevel(value * 4 + 1) }
)(FanLevel)
