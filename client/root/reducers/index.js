import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import { feedReducer, createFeedReducerPreloadedState } from './feed-reducer';
import { searchReducer, createSearchReducerPreloadedState } from './search-reducer';
import { filterReducer, createFilterReducerPreloadedState } from './filter-reducer';

export default combineReducers({
  homeReducer,
  feedReducer,
  searchReducer,
  filterReducer,
});

export const createPreloadedState = (location, response) => ({
  feedReducer: createFeedReducerPreloadedState(location, response),
  searchReducer: createSearchReducerPreloadedState(location),
  filterReducer: createFilterReducerPreloadedState(location),
});
