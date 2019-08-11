import { SET_QUERY } from '../actions/home-actions';

export default function homeReducer(
  state = {
    query: '',
  },
  { type, payload }, // action: { type, payload }
) {
  switch (type) {
    case SET_QUERY:
      return { ...state, query: payload.query };
    default:
      return state;
  }
}
