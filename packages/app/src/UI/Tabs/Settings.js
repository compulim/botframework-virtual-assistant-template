import { connect } from 'react-redux';
import { css } from 'glamor';
import React from 'react';

import overrideDirectLineSecret from '../../redux/actions/overrideDirectLineSecret';
import overrideLanguageCode from '../../redux/actions/overrideLanguageCode';
import overrideLatLong from '../../redux/actions/overrideLatLong';
import overrideSpeechServicesSubscriptionKey from '../../redux/actions/overrideSpeechServicesSubscriptionKey';
import overrideTimezone from '../../redux/actions/overrideTimezone';

const PREVENT_DEFAULT_FN = event => event.preventDefault();

const ROOT_CSS = css({
  padding: 10
});

const Settings = ({
  directLineSecret,
  overrideDirectLineSecret,

  speechServicesSubscriptionKey,
  overrideSpeechServicesSubscriptionKey,

  overrideLatitude,
  overrideLatLongToMSRAsia,
  overrideLatLongToRedmond,
  overrideLongitude,
  overrodeLatitude,
  overrodeLongitude,

  overrideLanguageCodeToEnglishUK,
  overrideLanguageCodeToEnglishUS,
  overrideLanguageCodeToSimplifiedChinese,
  overrodeLanguageCode,
  unoverrideLanguageCode,

  overrideTimezoneToCST,
  overrideTimezoneToPST,
  overrodeTimezoneOffset,
  unoverrideTimezone
}) =>
  <div className={ ROOT_CSS }>
    <h1>Overrides</h1>
    <h2>Secrets</h2>
    <div>
      <small>
        This settings requires refresh.
      </small>
    </div>
    <form onSubmit={ PREVENT_DEFAULT_FN }>
      <p>
        <label>
          Direct Line secret<br />
          <input
            autoComplete="off"
            onChange={ overrideDirectLineSecret }
            type="password"
            value={ directLineSecret || '' }
          />
        </label>
      </p>
      <p>
        <label>
          Speech Services subscription key<br />
          <input
            autoComplete="off"
            onChange={ overrideSpeechServicesSubscriptionKey }
            type="password"
            value={ speechServicesSubscriptionKey || '' }
          />
        </label>
      </p>
    </form>
    <h2>Geolocation</h2>
    <div>
      <label>
        Latitude&nbsp;
        <input
          onChange={ overrideLatitude }
          type="text"
          value={ overrodeLatitude || '' }
        />
      </label>
    </div>
    <div>
      <label>
        Longitude&nbsp;
        <input
          onChange={ overrideLongitude }
          type="text"
          value={ overrodeLongitude || '' }
        />
      </label>
      <button onClick={ overrideLatLongToRedmond }>Set to Redmond</button>
      <button onClick={ overrideLatLongToMSRAsia }>Set to MSR Asia</button>
    </div>
    <h2>Timezone</h2>
    <div>
      <label>
        <input
          checked={ typeof overrodeTimezoneOffset !== 'number' || isNaN(overrodeTimezoneOffset) }
          onChange={ unoverrideTimezone }
          type="radio"
        />
        Do not override timezone
      </label>
    </div>
    <div>
      <label>
        <input
          checked={ overrodeTimezoneOffset === 480 }
          onChange={ overrideTimezoneToPST }
          type="radio"
        />
        Override to Redmond timezone
      </label>
    </div>
    <div>
      <label>
        <input
          checked={ overrodeTimezoneOffset === -480 }
          onChange={ overrideTimezoneToCST }
          type="radio"
        />
        Override to Beijing timezone
      </label>
    </div>
    <h2>Language</h2>
    <div>
      <small>
        This settings requires refresh.
      </small>
    </div>
    <div>
      <label>
        <input
          checked={ !overrodeLanguageCode }
          onChange={ unoverrideLanguageCode }
          type="radio"
        />
        Do not override language code
      </label>
    </div>
    <div>
      <label>
        <input
          checked={ overrodeLanguageCode === 'en-US' }
          onChange={ overrideLanguageCodeToEnglishUS }
          type="radio"
        />
        Override to English (US)
      </label>
    </div>
    <div>
      <label>
        <input
          checked={ overrodeLanguageCode === 'en-UK' }
          onChange={ overrideLanguageCodeToEnglishUK }
          type="radio"
        />
        Override to English (UK)
      </label>
    </div>
    <div>
      <label>
        <input
          checked={ overrodeLanguageCode === 'zh-CN' }
          onChange={ overrideLanguageCodeToSimplifiedChinese }
          type="radio"
        />
        Override to Simplified Chinese
      </label>
    </div>
  </div>

export default connect(
  ({
    directLineSecret,
    speechServicesSubscriptionKey,
    geolocation: {
      overrodeLatitude,
      overrodeLongitude
    },
    language: {
      overrodeLanguageCode
    },
    timezone: {
      overrodeOffset: overrodeTimezoneOffset
    }
  }) => ({
    directLineSecret,
    speechServicesSubscriptionKey,
    overrodeLanguageCode,
    overrodeLatitude,
    overrodeLongitude,
    overrodeTimezoneOffset
  }),
  {
    overrideDirectLineSecret,
    overrideLanguageCode,
    overrideLatLong,
    overrideSpeechServicesSubscriptionKey,
    overrideTimezone
  },
  (
    stateProps,
    {
      overrideDirectLineSecret,
      overrideLanguageCode,
      overrideLatLong,
      overrideSpeechServicesSubscriptionKey,
      overrideTimezone
    },
    ownProps
  ) => ({
    ...ownProps,
    ...stateProps,

    // Direct Line and Speech Services secret
    overrideDirectLineSecret: ({ target: { value: nextDirectLineSecret } }) => overrideDirectLineSecret(nextDirectLineSecret),
    overrideSpeechServicesSubscriptionKey: ({ target: { value: nextSpeechServicesSubscriptionKey } }) => overrideSpeechServicesSubscriptionKey(nextSpeechServicesSubscriptionKey),

    // Geolocation
    overrideLatitude: ({ target: { value: nextLatitude } }) => overrideLatLong(+nextLatitude, stateProps.overrodeLongitude),
    overrideLongitude: ({ target: { value: nextLongitude } }) => overrideLatLong(stateProps.overrodeLatitude, +nextLongitude),
    overrideLatLongToMSRAsia: () => overrideLatLong(39.9796301, 116.3074183),
    overrideLatLongToRedmond: () => overrideLatLong(47.6423354, -122.1391189),

    // Language
    overrideLanguageCodeToSimplifiedChinese: () => overrideLanguageCode('zh-CN'),
    overrideLanguageCodeToEnglishUS: () => overrideLanguageCode('en-US'),
    overrideLanguageCodeToEnglishUK: () => overrideLanguageCode('en-UK'),
    unoverrideLanguageCode: () => overrideLanguageCode(),

    // Timezone
    overrideTimezoneToCST: () => overrideTimezone('CST', -480),
    overrideTimezoneToPST: () => { console.log('overrideTimezoneToPST'); return overrideTimezone('PST', 480); },
    unoverrideTimezone: () => overrideTimezone()
  })
)(Settings)
