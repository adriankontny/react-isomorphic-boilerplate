import { combineReducers } from 'redux';
import homeReducer from './home-reducer';
import searchReducer from './search-reducer';

const rootReducer = combineReducers({
  homeReducer,
  searchReducer
});

export default rootReducer;
