import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import ChromelessButton from './ChromelessButton';

const ROOT_CSS = css({
  borderRadius: '50%',
  color: 'Red',
  fontSize: 16,
  height: 30,
  lineHeight: '29px',
  outline: 0,
  width: 30,

  '&:hover': {
    backgroundColor: 'rgba(128, 128, 128, .1)'
  },

  '&.va--checked': {
    color: 'Green'
  }
});

export default ({
  checked,
  children,
  disabled,
  onClick
}) =>
  <ChromelessButton
    className={ classNames(
      ROOT_CSS + '',
      { 'va--checked': checked }
    ) }
    disabled={ disabled }
    onClick={ onClick }
  >
    { children }
  </ChromelessButton>
