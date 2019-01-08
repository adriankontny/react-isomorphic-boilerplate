import { combineEpics } from 'redux-observable';
import homeEpics from './home-epics';

const rootEpic = combineEpics(
  homeEpics,
);

export default rootEpic;
