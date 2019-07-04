import { combineEpics } from 'redux-observable';
import filterEpics from './filter-epics';
import searchEpics from './search-epics';

const rootEpic = combineEpics(
  // filterEpics,
  // searchEpics
);

export default rootEpic;
