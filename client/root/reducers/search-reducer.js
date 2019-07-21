import {
  UPDATE_SEARCH,
  UPDATE_SEARCH_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_DONE,
  LOAD_MORE_SIDE_EFFECTS,
  CHANGE_PAGE,
  CHANGE_PAGE_DONE,
  CHANGE_PAGE_SIDE_EFFECTS,
  TOGGLE_SIDEBAR_LEFT
} from '../actions/search-actions'
import {
  FILTERS_CHANGED
} from '../actions/filter-actions'
import qs from 'qs';
import get from 'lodash/get'

const updateUrl = (field, value, history, location) => {
  let search = qs.parse(location.search, { ignoreQueryPrefix: true })
  search[field] = value ? qs.stringify({ ...value }, { encode: true }) : undefined;
  let searchString = qs.stringify({ ...search }, { encode: true });
  setImmediate(() => history.replace({ search: searchString }));
}

export const createSearchReducerPreloadedState = (location, response) => {
  const { results } = response;
  return {
    total: results.length,
    results: results,
    firstCursor: results[0].uuid,
    lastCursor: results[results.length - 1].uuid,
    search: qs.parse(location.search, { ignoreQueryPrefix: true }).q,
    isScrolling: false,
    isLoadingTop: false,
    isLoadingBottom: false,
    sidebarLeftIsVisible: false
  };
};

export function searchReducer( 
  state,
  { type, payload }) { // action: { type, payload }
  let newState = state ;
  let { field, value, history, loacation, filterOrigin, results } = (payload || {});
  switch (type) {

    case FILTERS_CHANGED:
      updateUrl(field, value, history, location);
      return newState;
  
    case UPDATE_SEARCH:
      newState = { ...state, search: payload.value };
      // updateUrl
      newState.isLoadingTop = true;
      return newState;

    case UPDATE_SEARCH_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: results.length,
        results: results
      }
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length - 1].uuid;
      newState.isLoadingTop = false;
      return newState;
    
    case LOAD_MORE:
      newState = state;
      if (get(payload, 'event.previousPosition') === "above") {
        newState = { ...newState, isLoadingTop: true };
      }
      if (get(payload, 'event.previousPosition') === "below") {
        newState = { ...newState, isLoadingBottom: true };
      }
      return newState;

    case LOAD_MORE_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: state.results.length + results.length,
        page: state.results[state.results.length - 1].uuid
      }
      if (payload.reverse) {
        newState.results = [...results, ...state.results];
        newState.isLoadingTop = false;
      } else {
        newState.results = [...state.results, ...results];
      }
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length - 1].uuid;
      return newState;

    case CHANGE_PAGE:
      newState = {
        ...state,
        isScrolling: true
      }
      return newState;

    case CHANGE_PAGE_DONE:
      newState = {
        ...state,
        isScrolling: false,
      }
      return newState;

    case CHANGE_PAGE_SIDE_EFFECTS:
      newState = {
        ...state,
        // isScrolling: false,
      };
      // updateUrl
      return newState;

    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };

    default:
      return { ...state };
  };
};
