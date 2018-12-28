const SET_LANGUAGE = 'SET_LANGUAGE';

export default function (language) {
  return {
    type: SET_LANGUAGE,
    payload: { language }
  };
}

export { SET_LANGUAGE }
