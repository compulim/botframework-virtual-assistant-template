const SET_SOUND_TRACK = 'SET_SOUND_TRACK';

export default function (track, albumArt) {
  return {
    type: SET_SOUND_TRACK,
    payload: { albumArt, track }
  };
}

export { SET_SOUND_TRACK }
