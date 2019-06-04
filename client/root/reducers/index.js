import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import { searchReducer, createSearchReducerPreloadedState } from './search-reducer';
import { filterReducer, createFilterReducerPreloadedState } from './filter-reducer';

export default combineReducers({
  homeReducer,
  searchReducer,
  filterReducer,
});

export const createPreloadedState = (location, response) => ({
  searchReducer: createSearchReducerPreloadedState(location, response),
  filterReducer: createFilterReducerPreloadedState(location, response),
});
