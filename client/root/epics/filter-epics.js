import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  SET_FILTER_CATEGORY,
  SET_FILTER_INPUT,
  onFiltersChange,
} from '../actions/filter-actions';
import getLocation from '../reducers/filter-reducer-helpers/getLocation';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_FILTER_CATEGORY, SET_FILTER_INPUT),
  map((action) => action.payload),
  map(({ filterOrigin, history }) => {
    const field = 'filter';
    const value = getLocation(state$.value.filterReducer, filterOrigin);
    return onFiltersChange({ filterOrigin, history }, field, value);
  }),
);

export default combineEpics(
  exitEpic,
);
