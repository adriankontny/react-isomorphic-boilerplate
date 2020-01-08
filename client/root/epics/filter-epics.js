import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  SET_FILTER_CATEGORY,
  SET_FILTER_INPUT,
  ON_FILTERS_CHANGE,
} from '../actions/filter-actions';
import getLocation from '../reducers/filter-reducer-helpers/getLocation';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_FILTER_CATEGORY, SET_FILTER_INPUT),
  map((action) => action.payload),
  map(({ filterOrigin, history }) => ({
    type: ON_FILTERS_CHANGE,
    payload: {
      filterOrigin,
      history,
      field: 'filter',
      value: getLocation(state$.value.filterReducer, filterOrigin),
    },
  })),
);

export default combineEpics(
  exitEpic,
);
