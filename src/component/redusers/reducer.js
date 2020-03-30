const initialState = {
  pair: '',
  interval: '1000ms',
  isLoad: false,
  isError: false,
  Err: '',
};

export default function reducer(state = initialState, action) {
  console.log('>>>>>>>>>>>', action);
  switch (action.type) {
    case 'SELECT_PAIR':
      return {
        ...state,
        pair: action.payload,
      };
    case 'SET_INTERVAL':
      return {
        ...state,
        interval: action.payload,
      };
    case 'FETCH_LOAD':
      return {
        ...state,
        isLoad: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isError: action.payload.isError,
        Err: action.payload.Err,
      };
    case 'LOAD_SNAP_SHOT':
      return {
        ...state,
        bids: [...action.payload.bids],
      };
    default:
      return state;
  }
}
