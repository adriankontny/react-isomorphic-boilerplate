import {
  UPDATE_SEARCH,
  UPDATE_SEARCH_SIDE_EFFECTS,
  LOAD_MORE,
  LOAD_MORE_SIDE_EFFECTS
} from '../actions/search-actions'
import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import axios from 'axios';

import { combineEpics, ofType } from 'redux-observable';
import {
  filter, map, switchMap, debounceTime, distinctUntilChanged, tap, takeUntil
} from 'rxjs/operators';
import { from } from 'rxjs';

const axiosGet = (action$, url, options = {}) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return from(axios.get(url, {...options, cancelToken: source.token})).pipe(
    takeUntil(action$.pipe(
      ofType(UPDATE_SEARCH, SELECT_CATEGORY, UPDATE_INPUT),
      tap(source.cancel)
    ))
  )
};

const updateSearch = action$ => action$.pipe(
  ofType(UPDATE_SEARCH, SELECT_CATEGORY, UPDATE_INPUT),
  filter(action => action.payload.filterOrigin === 'searchFilter'),
  map(action => action.payload.location.search),
  debounceTime(100),
  distinctUntilChanged(),
  switchMap(search => axiosGet(action$, '/api')),
  map(response => ({ type: UPDATE_SEARCH_SIDE_EFFECTS, payload: { ...response.data } })),
);

const loadMore = action$ => action$.pipe(
  ofType(LOAD_MORE),
  filter(action => action.payload.filterOrigin === 'searchFilter'),
  map(action => action.payload.location.search),
  switchMap(search => axiosGet(action$, '/api')),
  map(response => ({ type: LOAD_MORE_SIDE_EFFECTS, payload: { ...response.data } })),
);

export default combineEpics(
  updateSearch,
  loadMore
);
