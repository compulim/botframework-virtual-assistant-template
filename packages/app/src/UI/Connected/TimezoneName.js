import { connect } from 'react-redux';
import React from 'react';

const TimezoneName = ({ timezoneName }) =>
  !!timezoneName && <span>{ timezoneName }</span>

export default connect(
  ({ timezone }) => ({
    timezoneName: (timezone || {}).name
  })
)(TimezoneName)
