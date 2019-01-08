import { combineReducers } from 'redux';
import homeReducer from './home-reducer';

const rootReducer = combineReducers({
  homeReducer,
});

export default rootReducer;
