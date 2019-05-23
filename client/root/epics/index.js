import { combineEpics } from 'redux-observable';
import searchEpics from './search-epics';

const rootEpic = combineEpics(
  searchEpics,
);

export default rootEpic;
