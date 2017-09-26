import { combineReducers } from 'redux';
import { usersReducer } from '../modules/User/redux/reducer';
import { usersReducer as enhancedUsersReducer } from '../modules/User/redux/enhancedReducer';

export default combineReducers({
  // users: usersReducer,
  users: enhancedUsersReducer,
});