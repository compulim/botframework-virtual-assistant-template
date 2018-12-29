import { connect } from 'react-redux';
import { css } from 'glamor';
import classNames from 'classnames';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import memoizeWithDispose from 'memoize-one-with-dispose';
import React from 'react';

const ROOT_CSS = css({
});

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.memoizedCreateDirectLine = memoizeWithDispose(directLineOptions => {
      if (!directLineOptions) { return; }

      const {
        domain,
        token,
        webSocket
      } = directLineOptions;

      return createDirectLine({
        domain,
        token,
        webSocket
      });
    }, directLine => directLine.end());
  }

  componentWillUnmount() {
    this.memoizedCreateDirectLine(null);
  }

  render() {
    const { className, directLineOptions } = this.props;

    if (!directLineOptions) {
      return false;
    }

    return (
      <ReactWebChat
        className={ classNames(ROOT_CSS + '', className) }
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
