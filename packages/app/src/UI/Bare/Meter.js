import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

const ROOT_CSS = css({
  backgroundColor: 'rgba(255, 0, 0, .1)',
  height: 25,
  position: 'relative',
  width: 50,

  '& > .va__hand': {
    borderTop: 'solid 1px Black',
    bottom: 0,
    boxSizing: 'border-box',
    left: '50%',
    position: 'absolute',
    transformOrigin: '0 0',
    width: '50%'
  }
});

export default ({
  className,
  degree = 0
}) =>
  <div
    className={ classNames(
      ROOT_CSS + '',
      (className || '') + ''
    ) }
  >
    <div
      className="va__hand"
      style={{ transform: `rotate(${ degree }deg)` }}
    />
  </div>
