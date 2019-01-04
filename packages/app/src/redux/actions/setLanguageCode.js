const SET_LANGUAGE_CODE = 'SET_LANGUAGE_CODE';

export default function (languageCode) {
  return {
    type: SET_LANGUAGE_CODE,
    payload: { languageCode }
  };
}

export { SET_LANGUAGE_CODE }
