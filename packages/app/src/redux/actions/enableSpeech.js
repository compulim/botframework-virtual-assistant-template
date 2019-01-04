const ENABLE_SPEECH = 'ENABLE_SPEECH';
const ENABLE_SPEECH_PENDING = `${ ENABLE_SPEECH }_PENDING`;
const ENABLE_SPEECH_REJECTED = `${ ENABLE_SPEECH }_REJECTED`;
const ENABLE_SPEECH_FULFILLED = `${ ENABLE_SPEECH }_FULFILLED`;

export default function (url = '/api/speechservices/token') {
  return async dispatch => {
    dispatch({ type: ENABLE_SPEECH_PENDING });

    try {
      const res = await fetch(url, { method: 'POST' });

      if (!res.ok) {
        throw new Error(`failed to get Speech Services token, server returned ${ res.status }`);
      }

      const { region = 'westus', token } = JSON.parse(await res.text());

      dispatch({ type: ENABLE_SPEECH_FULFILLED, payload: { region, authorizationToken: token } });
    } catch (err) {
      dispatch({ type: ENABLE_SPEECH_REJECTED, error: true, payload: err });
    }
  };
}

export {
  ENABLE_SPEECH_PENDING,
  ENABLE_SPEECH_REJECTED,
  ENABLE_SPEECH_FULFILLED
}
