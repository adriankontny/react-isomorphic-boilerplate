import { combineEpics } from 'redux-observable';
import filterEpics from './filter-epics';
import searchEpics from './search-epics';
import feedEpics from './feed-epics';

const rootEpic = combineEpics(
  filterEpics,
  searchEpics,
  // feedEpics,
);

export default rootEpic;
