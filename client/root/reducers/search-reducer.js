import {
  UPDATE_SEARCH,
  UPDATE_SEARCH_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_DONE,
  LOAD_MORE_SIDE_EFFECTS,
  TOGGLE_SIDEBAR_LEFT
} from '../actions/search-actions'
import qs from 'qs';

const updateUrl = (state, page, history, location) => {
  let search = qs.parse(location.search, { ignoreQueryPrefix: true })
  search.q = state.search || undefined;
  search.page = page || undefined;
  let searchString = qs.stringify({ ...search }, { encode: true });
  setImmediate(() => history.replace({ search: searchString }));

  return { ...state, page };
}

export const createSearchReducerPreloadedState = (location, response) => {
  const { results } = response;
  return {
    total: results.length,
    results: results,
    firstCursor: results[0].uuid,
    lastCursor: results[results.length-1].uuid,
    search: qs.parse(location.search, { ignoreQueryPrefix: true }).q,
    isLoaded: true,
    sidebarLeftIsVisible: false
  };
};

export function searchReducer(
  state,
  { type, payload }) { // action: { type, payload }
  let newState, results;
  switch (type) {

    case UPDATE_SEARCH:
      newState = { ...state, search: payload.value };
      newState = updateUrl( newState, newState.page, payload.history, payload.location );
      return newState;

    case UPDATE_SEARCH_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: results.length,
        results: results
      }
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length-1].uuid;
      return newState;

    case LOAD_MORE:
      newState = {
        ...state,
        isLoaded: false
      }
      if (payload.event.previousPosition === 'below') {
        newState = updateUrl(newState, newState.lastCursor, payload.history, payload.location);
      }
      return newState;

    case LOAD_MORE_DONE:
      newState = {
        ...state,
        isLoaded: true,
      }
      return newState;

    case LOAD_MORE_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: state.results.length + results.length,
        page: state.results[state.results.length-1].uuid
      }
      if (!payload.reverse) {
        newState.results = [...state.results, ...results];
      } else {
        newState.results = [...results, ...state.results];
      }
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length-1].uuid;
      return newState;

    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };

    default:
      return { ...state };
  };
};
