import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import searchReducer from './search-reducer';

export default combineReducers({
  homeReducer,
  searchReducer
});
