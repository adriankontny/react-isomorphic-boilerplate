import { SET_SEARCH } from '../actions/search-actions'

export default function searchReducer (
  state = {
    search: '',
  },
  { type, payload }) { // action: { type, payload }
  switch (type) {
    case SET_SEARCH:
      return { ...state, search: payload.search };
    default:
      return state;
  }
};
