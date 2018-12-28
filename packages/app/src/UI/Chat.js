import { connect } from 'react-redux';
import { css } from 'glamor';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import memoize from 'memoize-one';
import React from 'react';

const ROOT_CSS = css({
  height: '100%',
  width: '100%'
});

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.memoizedCreateDirectLine = memoize(({
      domain,
      token,
      webSocket
    }) => createDirectLine({
      domain,
      token,
      webSocket
    }));
  }

  render() {
    const { directLineOptions } = this.props;

    if (!directLineOptions) {
      return false;
    }

    return (
      <ReactWebChat
        className={ ROOT_CSS }
        directLine={ this.memoizedCreateDirectLine(directLineOptions) }
      />
    );
  }
}

export default connect(
  ({
    directLineOptions
  }) => ({
    directLineOptions
  })
)(Chat)
