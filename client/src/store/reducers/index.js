import {combineReducers} from 'redux';
import userReducer from './user';
import pollReducer from './poll';

export default combineReducers({
  users: userReducer,
  polls: pollReducer
})
