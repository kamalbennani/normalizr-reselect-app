import { combineReducers } from 'redux';
import { usersReducer } from '../modules/User/redux/reducer';

export default combineReducers({
  users: usersReducer,
});