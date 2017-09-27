import { combineReducers } from 'redux';
import { usersReducer } from '../modules/User/redux/reducer';
import { counterReducer } from '../modules/Counter/redux/reducer';

export default combineReducers({
  users: usersReducer,
  count: counterReducer,
});