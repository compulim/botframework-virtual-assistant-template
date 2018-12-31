import setClock from '../actions/setClock';

const RESOLUTION = 60000;

export default function () {
  return store => {
    let lastDate = 0;

    setInterval(() => {
      const now = Math.floor(Date.now() / RESOLUTION) * RESOLUTION;

      if (now !== lastDate) {
        store.dispatch(setClock(now));
        lastDate = now;
      }
    }, 1000);

    return next => action => next(action);
  };
}
