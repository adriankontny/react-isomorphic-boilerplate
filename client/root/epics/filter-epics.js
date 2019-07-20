import {
  SET_CATEGORY,
  SET_FILTER,
  FILTERS_CHANGED
} from '../actions/filter-actions'
import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_CATEGORY, SET_FILTER),
  map(action => ({ ...action.payload })),
  map(payload => ({ type: FILTERS_CHANGED, payload: {
    ...payload,
    location: {
      ...payload.location,
      search: state$.value.filterReducer[payload.filterOrigin].filterComponentValues
    }
  }}))
)

export default combineEpics(
  exitEpic
);
