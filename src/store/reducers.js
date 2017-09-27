import { combineReducers } from 'redux';
import { usersReducer } from '../modules/User/redux/reducer';
import { postsReducer } from '../modules/Post/redux/reducer';
import { counterReducer } from '../modules/Counter/redux/reducer';

export default combineReducers({
  users: usersReducer,
  posts: postsReducer,
  count: counterReducer,
});