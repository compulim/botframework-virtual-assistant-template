import React from 'react';

export default ({
  className,
  kilometer,
  unit,
  unitText
}) =>
  unit === 'mile' ?
    <span className={ className }>{ Math.round(kilometer * 0.62137119) } { unitText || 'Miles' }</span>
  :
    <span className={ className }>{ Math.round(kilometer) } { unitText || 'KM' }</span>
