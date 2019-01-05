import { combineEpics } from 'redux-observable';
import query from './query';

const rootEpic = combineEpics(
  query,
);

export default rootEpic;
