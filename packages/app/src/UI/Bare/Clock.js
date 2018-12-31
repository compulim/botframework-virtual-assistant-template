import React from 'react';

function pad(value, count = 2, padding = '0') {
  value += '';
  count -= value.length;

  while (count-- > 0) {
    value = padding + value;
  }

  return value;
}

export default ({
  value
}) => {
  const date = new Date(value);
  const hours = date.getHours();

  return (
    <span>{ hours ? hours : 12 }:{ pad(date.getMinutes()) } { hours < 12 ? 'AM' : 'PM' }</span>
  );
}
