const query = (state = {
  main: '',
}, action) => {
  const newState = {};
  switch (action.type) {
    case 'SET_QUERY':
      newState[action.query.type] = action.query.value;
      return Object.assign({}, state, newState);
    default:
      return state;
  }
};

export default query;
