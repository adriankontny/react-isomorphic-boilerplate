import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  SET_SEARCH_INPUT,
  onSearchChange,
} from '../actions/search-actions';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_SEARCH_INPUT),
  map((action) => action.payload),
  map(({ filterOrigin, history }) => {
    const field = 'search';
    const value = { search: state$.value.searchReducer.search };
    return onSearchChange({ filterOrigin, history }, field, value);
  }),
);

export default combineEpics(
  exitEpic,
);
