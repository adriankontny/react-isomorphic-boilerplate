import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import searchReducer from './search-reducer';
import { filterReducer, createFilterReducerPreloadedState } from './filter-reducer';

export default combineReducers({
  homeReducer,
  searchReducer,
  filterReducer
});

export const createPreloadedState = (location) => {
  return {
    filterReducer: createFilterReducerPreloadedState(location)
  }
}
