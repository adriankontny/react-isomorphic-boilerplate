import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import searchReducer from './search-reducer';
import filterReducer from './filter-reducer';

export default combineReducers({
  homeReducer,
  searchReducer,
  filterReducer
});
