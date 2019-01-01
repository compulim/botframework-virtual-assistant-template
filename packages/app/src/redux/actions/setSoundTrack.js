const SET_SOUND_TRACK = 'SET_SOUND_TRACK';

export default function (track) {
  return {
    type: SET_SOUND_TRACK,
    payload: { track }
  };
}

export { SET_SOUND_TRACK }
