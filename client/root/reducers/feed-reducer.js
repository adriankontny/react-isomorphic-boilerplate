import qs from 'qs';
import get from 'lodash/get';
import {
  UPDATE_QUERY_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_SIDE_EFFECTS,
  CHANGE_PAGE,
  TOGGLE_SIDEBAR_LEFT,
} from '../actions/feed-actions';
import {
  ON_FILTERS_CHANGE,
} from '../actions/filter-actions';
import {
  ON_SEARCH_CHANGE,
} from '../actions/search-actions';

const updateUrl = ({ filterOrigin, history }, field, value) => {
  const search = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  if (field === 'filter') {
    search[filterOrigin] = qs.stringify({ ...value.search }, { encode: true }) || undefined;
  } else {
    search[field] = value.search || undefined;
  }
  const searchString = qs.stringify({ ...search }, { encode: true });
  setImmediate(() => history.replace({ search: searchString }));
};

export const createFeedReducerPreloadedState = (location, response) => {
  const { results } = response;
  return {
    total: results.length,
    results,
    firstCursor: results[0].uuid,
    lastCursor: results[results.length - 1].uuid,
    search: qs.parse(location.search, { ignoreQueryPrefix: true }).q,
    isScrolling: false,
    isLoadingTop: false,
    isLoadingBottom: false,
    sidebarLeftIsVisible: false,
  };
};

export function feedReducer(
  state,
  { type, payload }, // action: { type, payload }
) {
  let newState = state;
  let {
    field, value, history, loacation, filterOrigin, results,
  } = (payload || {});
  switch (type) {
    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };

    case CHANGE_PAGE:
    case ON_SEARCH_CHANGE:
    case ON_FILTERS_CHANGE:
      updateUrl({ filterOrigin, history }, field, value);
      return newState;

    case UPDATE_QUERY_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: results.length,
        results,
      };
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length - 1].uuid;
      newState.isLoadingTop = false;
      return newState;

    case LOAD_MORE:
      newState = state;
      if (get(payload, 'event.previousPosition') === 'above') {
        newState = { ...newState, isLoadingTop: true };
      }
      if (get(payload, 'event.previousPosition') === 'below') {
        newState = { ...newState, isLoadingBottom: true };
      }
      return newState;

    case LOAD_MORE_SIDE_EFFECTS:
      results = payload.results;
      newState = {
        ...state,
        total: state.results.length + results.length,
        page: state.results[state.results.length - 1].uuid,
      };
      if (payload.reverse) {
        newState.results = [...results, ...state.results];
        newState.isLoadingTop = false;
      } else {
        newState.results = [...state.results, ...results];
      }
      newState.firstCursor = newState.results[0].uuid;
      newState.lastCursor = newState.results[newState.results.length - 1].uuid;
      return newState;

    default:
      return { ...state };
  }
}
