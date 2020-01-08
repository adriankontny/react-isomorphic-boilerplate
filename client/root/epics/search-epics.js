import axios from 'axios';
import qs from 'qs';

import { combineEpics, ofType } from 'redux-observable';
import {
  filter, map, switchMap, concatMap, debounceTime, distinctUntilChanged, tap, takeUntil,
} from 'rxjs/operators';
import { from } from 'rxjs';
import {
  ON_FILTERS_CHANGE,
} from '../actions/filter-actions';
import {
  SET_SEARCH_INPUT,
  UPDATE_SEARCH_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_SIDE_EFFECTS,
  CHANGE_PAGE,
  CHANGE_PAGE_DONE,
  CHANGE_PAGE_SIDE_EFFECTS,
} from '../actions/search-actions';

const axiosGet = (action$, url, options = {}) => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const targetUrl = typeof url === 'function' ? url() : url;
  return from(axios.get(targetUrl, { ...options, cancelToken: source.token })).pipe(
    takeUntil(action$.pipe(
      ofType(SET_SEARCH_INPUT, ON_FILTERS_CHANGE),
      tap(source.cancel),
    )),
  );
};

const setSearchInput = (action$, state$) => action$.pipe(
  ofType(SET_SEARCH_INPUT, ON_FILTERS_CHANGE),
  filter((action) => action.payload.filterOrigin === 'searchFilter'),
  map(() => {
    const queryObject = {
      ...state$.value.filterReducer.searchFilter.filterComponentValues,
      q: state$.value.searchReducer.search || undefined,
      page: state$.value.searchReducer.page || undefined,
    };
    const query = qs.stringify({ ...queryObject }, { encode: true });
    const search = query ? (`?${query}`) : '';
    return search;
  }),
  debounceTime(100),
  distinctUntilChanged(),
  switchMap((search) => axiosGet(action$, `/api${search}`)),
  map((response) => ({ type: UPDATE_SEARCH_SIDE_EFFECTS, payload: { ...response.data } })),
);

const loadMore = (action$, state$) => action$.pipe(
  ofType(LOAD_MORE),
  filter((action) => action.payload.filterOrigin === 'searchFilter'),
  filter((action) => typeof (action.payload.event.previousPosition) !== 'undefined'),
  concatMap((action) => axiosGet(action$, () => {
    const queryObject = {
      ...state$.value.filterReducer.searchFilter.filterComponentValues,
      q: state$.value.searchReducer.search || undefined,
    };
    if (action.payload.event.previousPosition === 'below') {
      queryObject.since = state$.value.searchReducer.lastCursor || undefined;
    } else if (action.payload.event.previousPosition === 'above') {
      queryObject.until = state$.value.searchReducer.firstCursor || undefined;
    }
    const query = qs.stringify({ ...queryObject }, { encode: true });
    const search = query ? (`?${query}`) : '';
    return `/api${search}`;
  }).pipe(
    takeUntil(action$.pipe(
      ofType(SET_SEARCH_INPUT, ON_FILTERS_CHANGE),
    )),
  )),
  map((response) => ({ type: LOAD_MORE_SIDE_EFFECTS, payload: { ...response.data } })),
);

const changePageWait = (action$) => action$.pipe(
  ofType(CHANGE_PAGE),
  debounceTime(500),
  map(() => ({ type: CHANGE_PAGE_DONE, payload: {} })),
);

const changePage = (action$) => action$.pipe(
  ofType(CHANGE_PAGE),
  debounceTime(500),
  distinctUntilChanged((prev, curr) => prev.payload.value === curr.payload.value),
  map((action) => action.payload),
  map((payload) => ({ type: CHANGE_PAGE_SIDE_EFFECTS, payload })),
);

export default combineEpics(
  setSearchInput,
  changePageWait,
  changePage,
  loadMore,
);
