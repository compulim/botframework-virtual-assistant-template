import { connect } from 'react-redux';
import { css } from 'glamor';
import classNames from 'classnames';
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import memoize from 'memoize-one';
import memoizeWithDispose from 'memoize-one-with-dispose';
import React from 'react';

import setCabinTemperature from '../redux/actions/setCabinTemperature';
import setSoundSource from '../redux/actions/setSoundSource';
import setSoundTrack from '../redux/actions/setSoundTrack';

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

    this.memoizedCreateStore = memoize(() => {
      const store = createStore(
        {},
        ({ dispatch }) => next => action => {
          const { payload, type } = action;

          if (type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const { activity } = payload;

            if (
              activity.type === 'event'
              && activity.name === 'ActiveRoute.Directions'
            ) {
              try {
                // this.props.setDestination({
                //   estimatedTimeOfArrival: new Date(Date.now() + 15 * 60000),
                //   fullAddress: activity.value.Destination.address.formattedAddress
                // });
              } catch (err) {
                console.error(err);
              }
            }

            if (
              activity.type === 'event'
              && activity.name === 'ChangeTemperature'
            ) {
              this.props.setCabinTemperature(activity.value);
            }

            if (
              activity.type === 'event'
              && activity.name === 'TuneRadio'
            ) {
              this.props.setSoundSource(activity.value);
              this.props.setSoundTrack('DAFT PUNK - Robot Rock');
            }

            if (
              activity.type === 'event'
              && activity.name === 'PlayMusic'
            ) {
              this.props.setSoundSource('Bluetooth');
              this.props.setSoundTrack(activity.value);
            }
          } else if (type === 'DIRECT_LINE/CONNECTION_STATUS_UPDATE' && payload.connectionStatus === 2) {
            console.log('dispatch');

            dispatch({
              type: 'DIRECT_LINE/POST_ACTIVITY',
              payload: {
                activity: {
                  name: 'startConversation',
                  type: 'event',
                  local: 'en-US',
                  value: ''
                }
              }
              // from: { id: userID, name: "User", role: "user"},
              // name   : 'startConversation',
              // type   : 'event',
              // locale : this.props.locale,
              // value  : ''
            });
          }

          console.log(action);

          return next(action);
        }
      );

      return store;
    });
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
        store={ this.memoizedCreateStore() }
      />
    );
  }
}

export default connect(
  ({
    directLineOptions
  }) => ({
    directLineOptions
  }),
  {
    setCabinTemperature,
    setSoundSource,
    setSoundTrack
  }
)(Chat)
