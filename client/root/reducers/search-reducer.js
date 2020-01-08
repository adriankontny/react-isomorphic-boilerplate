import qs from 'qs';
import {
  SET_SEARCH_INPUT,
} from '../actions/search-actions';


export const createSearchReducerPreloadedState = (location) => {
  return {
    search: qs.parse(location.search, { ignoreQueryPrefix: true }).search || '',
  };
};

export function searchReducer(
  state,
  { type, payload }, // action: { type, payload }
) {
  let newState = state;
  switch (type) {
    case SET_SEARCH_INPUT:
      newState = { ...state, search: payload.value };
      return newState;

    default:
      return { ...state };
  }
}
