import { combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import {
  SET_SEARCH_INPUT,
  ON_SEARCH_CHANGE,
} from '../actions/search-actions';

const exitEpic = (action$, state$) => action$.pipe(
  ofType(SET_SEARCH_INPUT),
  map((action) => action.payload),
  map(({ filterOrigin, history }) => ({
    type: ON_SEARCH_CHANGE,
    payload: {
      filterOrigin,
      history,
      field: 'search',
      value: { search: state$.value.searchReducer.search },
    },
  })),
);

export default combineEpics(
  exitEpic,
);
