import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import UIFabricIcon from './UIFabricIcon';

const ROOT_CSS = css({
  alignItems: 'center',
  display: 'flex',
  height: 20,
  justifyContent: 'center',
  transformOrigin: 'center',
  width: 20
});

// Compass heading calculation from https://w3c.github.io/deviceorientation/#worked-example
const DEGREE_TO_RADIAN = Math.PI / 180; // Degree-to-Radian conversion

function compassHeading(alpha, beta, gamma) {
  const x = beta  ? beta  * DEGREE_TO_RADIAN : 0; // beta value
  const y = gamma ? gamma * DEGREE_TO_RADIAN : 0; // gamma value
  const z = alpha ? alpha * DEGREE_TO_RADIAN : 0; // alpha value

  // const cX = Math.cos(x);
  const cY = Math.cos(y);
  const cZ = Math.cos(z);
  const sX = Math.sin(x);
  const sY = Math.sin(y);
  const sZ = Math.sin(z);

  // Calculate Vx and Vy components
  const Vx = -cZ * sY - sZ * sX * cY;
  const Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  let compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * (180 / Math.PI); // Compass Heading (in degrees)
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);

    this.state = {
      heading: 0
    };
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleDeviceOrientation);
    }
  }

  componentWillUnmount() {
    if (window.DeviceOrientationEvent) {
      window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
    }
  }

  handleDeviceOrientation({ alpha, beta, gamma }) {
    this.setState(() => ({
      heading: compassHeading(alpha, beta, gamma)
    }));
  }

  render() {
    const {
      props: { className },
      state: { heading }
    } = this;

    return (
      <div
        className={ classNames(
          ROOT_CSS + '',
          (className || '') + ''
        ) }
        style={{ transform: `rotate(${ heading }deg)` }}
      >
        <UIFabricIcon icon="WindDirection" />
      </div>
    );
  }
}
