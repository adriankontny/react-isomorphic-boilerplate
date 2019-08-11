import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  SET_CATEGORY,
  SET_FILTER,
  FILTERS_CHANGED,
} from '../actions/filter-actions';
import getLocation from '../reducers/filter-reducer-helpers/getLocation';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_CATEGORY, SET_FILTER),
  map((action) => ({ ...action.payload })),
  map((payload) => ({
    type: FILTERS_CHANGED,
    payload: {
      ...payload,
      field: payload.filterOrigin,
      value: getLocation(state$.value.filterReducer, payload.filterOrigin).search,
    },
  })),
);

export default combineEpics(
  exitEpic,
);
