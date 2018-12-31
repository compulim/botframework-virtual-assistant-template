const SET_TIMEZONE = 'SET_TIMEZONE';

export default function (name) {
  return {
    type: SET_TIMEZONE,
    payload: { name }
  };
}

export { SET_TIMEZONE }
