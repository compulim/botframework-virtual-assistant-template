import React from 'react';

// F = 32 + 1.8C

export default ({
  celsius,
  className
}) =>
  typeof celsius === 'number' &&
    <span className={ className }>
      { celsius.toFixed(1) }&deg;C
    </span>
