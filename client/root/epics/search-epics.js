import {
  UPDATE_SEARCH
} from '../actions/search-actions'
import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import axios from 'axios';

import { ofType } from 'redux-observable';
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
}

const search = action$ => action$.pipe(
  ofType(UPDATE_SEARCH, SELECT_CATEGORY, UPDATE_INPUT),
  filter( action => action.payload.filtersObjectPath === 'feed'),
  map(action => action.payload.location.search),
  debounceTime(100),
  distinctUntilChanged(),
  switchMap(search => axiosGet(action$, '/api')),
  map(response => ({ type: 'PONG', payload: response.data.payload })),
  tap(console.log),
);

export default search;
