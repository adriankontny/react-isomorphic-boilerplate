import {
  SET_CATEGORY,
  SET_FILTER
} from '../actions/filter-actions'
import {
  UPDATE_SEARCH,
} from '../actions/search-actions'

import { combineEpics, ofType } from 'redux-observable';
import { map, tap } from 'rxjs/operators';

const proxySearchEpic = (action$, state$) => action$.pipe(
  ofType(SET_CATEGORY, SET_FILTER),
  tap(console.log),
  map(action => ({ ...action.payload })),
  map(payload => ({ type: UPDATE_SEARCH, payload }))
)

export default combineEpics(
  proxySearchEpic
);
