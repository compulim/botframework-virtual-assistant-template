const OVERRIDE_TIMEZONE = 'OVERRIDE_TIMEZONE';

export default function (name) {
  return {
    type: OVERRIDE_TIMEZONE,
    payload: { name }
  };
}

export { OVERRIDE_TIMEZONE }
