import { connect } from 'react-redux';
import { css } from 'glamor';
import classNames from 'classnames';

import
  ReactWebChat,
  {
    createCognitiveServicesSpeechServicesPonyfillFactory,
    createDirectLine,
    createStore
  } from 'botframework-webchat';

import memoize from 'memoize-one';
import memoizeWithDispose from 'memoize-one-with-dispose';
import React from 'react';
import updateIn from 'simple-update-in';

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
    }, () => {
      // TODO: We should stop DirectLineJS to prevent resources leak
    });

    this.memoizedCreateStore = memoize(() => {
      const store = createStore(
        {},
        ({ dispatch }) => next => action => {
          try {
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
                this.props.setCabinTemperature(+activity.value);
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
              dispatch({
                type: 'DIRECT_LINE/POST_ACTIVITY',
                payload: {
                  activity: {
                    name: 'startConversation',
                    type: 'event',
                    value: ''
                  }
                }
              });
            } else if (type === 'DIRECT_LINE/POST_ACTIVITY') {
              const { heading, geolocation: { latitude, longitude } } = this.props;

              if (typeof heading === 'number' && !isNaN(heading)) {
                action = updateIn(action, ['channelData', 'heading'], () => heading);
              }

              if (!isNaN(latitude) && !isNaN(longitude)) {
                action = updateIn(action, ['channelData', 'latLong'], () => ({ latitude, longitude }));
              }
            }

            return next(action);
          } catch (err) {
            console.error(err);

            throw err;
          }
        }
      );

      // this.memoizedCreateSpeechServicesPonyfill = memoize((authorizationToken, region) => createCognitiveServicesSpeechServicesPonyfillFactory({ authorizationToken, region }));

      return store;
    });

    this.state = { speechServicesPonyfill: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.speechServicesOptions !== this.props.speechServicesOptions) {
      createCognitiveServicesSpeechServicesPonyfillFactory(nextProps.speechServicesOptions).then(speechServicesPonyfill => {
        this.setState(() => ({ speechServicesPonyfill }));
      });
    }
  }

  componentWillUnmount() {
    this.memoizedCreateDirectLine(null);
  }

  render() {
    const
      {
        props: { className, directLineOptions, languageCode },
        state: { speechServicesPonyfill }
      }
    = this;

    if (!directLineOptions) {
      return false;
    }

    return (
      <ReactWebChat
        className={ classNames(ROOT_CSS + '', className) }
        directLine={ this.memoizedCreateDirectLine(directLineOptions) }
        locale={ languageCode }
        webSpeechPonyfillFactory={ speechServicesPonyfill }
        store={ this.memoizedCreateStore() }
      />
    );
  }
}

export default connect(
  ({
    directLineOptions,
    geolocation,
    language: { languageCode },
    speechServicesOptions
  }) => ({
    directLineOptions,
    geolocation,
    languageCode,
    speechServicesOptions
  }),
  {
    setCabinTemperature,
    setSoundSource,
    setSoundTrack
  }
)(Chat)
