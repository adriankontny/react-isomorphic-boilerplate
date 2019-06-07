import {
  UPDATE_SEARCH,
  UPDATE_SEARCH_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_SIDE_EFFECTS,
  TOGGLE_SIDEBAR_LEFT
} from '../actions/search-actions'
import qs from 'qs';

const updateUrl = (state, history, location) => {

  let search = {
    ...qs.parse(location.search, { ignoreQueryPrefix: true }),
    q: state.search
  }

  let searchString = qs.stringify({ ...search }, { encode: true });
  history.replace({ search: searchString });

  return state;
}

export const createSearchReducerPreloadedState = (location, response) => {
  const { results } = response;
  return {
    total: results.length,
    results: results
  };
};

export function searchReducer(
  state = {
    search: '',
    sidebarLeftIsVisible: false
  },
  { type, payload }) { // action: { type, payload }
  let newState, results;
  switch (type) {

    case UPDATE_SEARCH:
      newState = updateUrl( { ...state, search: payload.value }, payload.history, payload.location );
      return newState;

    case UPDATE_SEARCH_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        page: 0,
        total: results.length,
        results: results
      }
      return newState;

    case LOAD_MORE_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        page: state.page + 1,
        total: state.results.length + results.length,
        results: [...state.results, ...results]
      }
      return newState;

    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };

    default:
      return { ...state };
  };
};
