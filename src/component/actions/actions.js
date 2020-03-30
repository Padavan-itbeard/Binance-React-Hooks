// не стал переносить на useReduce
// будет нужно, перенесу
export const setPair = (newPair) => ({
  type: 'SELECT_PAIR',
  payload: newPair,
});

export const setIntrvl = (newInt) => ({
  type: 'SET_INTERVAL',
  payload: newInt,
});


export const fetchLoad = (bool) => ({
  type: 'FETCH_LOAD',
  payload: bool,
});

export const fetchData = (obj) => ({
  type: 'FETCH_DATA',
  payload: obj,
});

export const fetchError = (err) => ({
  type: 'FETCH_ERROR',
  payload: err,
});
