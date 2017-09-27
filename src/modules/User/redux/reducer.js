import { Map, List, fromJS, Record } from 'immutable';
import axios from 'axios';
import { fetchPostsList } from '../../Post/redux/reducer';

const FETCH_USERS_REQUEST_STARTED = 'users/FETCH_USERS_REQUEST_STARTED';
const FETCH_USERS_REQUEST_ENDED = 'users/FETCH_USERS_REQUEST_ENDED';
const FETCH_USERS_REQUEST_FAILED = 'users/FETCH_USERS_REQUEST_FAILED';

const TOGGLE_USER_STATUS = 'user/TOGGLE_USER_STATUS';

export const fetchUsersList = () => dispatch => {
  // Starting the fetching request
  dispatch({
    type: FETCH_USERS_REQUEST_STARTED,
  });
  return axios.get('https://randomuser.me/api?results=100&inc=name,email,picture')
  .then((response) => {
    // Getting the response    
    if (response.data) {
      dispatch(fetchPostsList(response.data.results));
      return dispatch({
        type: FETCH_USERS_REQUEST_ENDED,
        payload: {
          data: response.data.results,
        }
      })
    }

    return dispatch(fetchUsersFailed());
  })
  .catch(() => dispatch(fetchUsersFailed()));
}

const fetchUsersFailed = () => {
  return {
    type: FETCH_USERS_REQUEST_FAILED,
    payload: {
      error: 'Something went wrong',
    }
  }
}

export const toggleActiveStatus = (userId) => {
  return {
    type: TOGGLE_USER_STATUS,
    payload: {
      userId,
    }
  }
}

const UserRecord = Record({
  name: null,
  email: null,
  picture: null,
  isActive: true,
})

const initialState = Map({
  entities: List(),
  _metadata: Map({
    fetching: false,
    error: null,
  })
})

export const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST_STARTED:
      return state.setIn(['_metadata', 'fetching'], true);
    case FETCH_USERS_REQUEST_FAILED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'error'], action.payload.error);
    case FETCH_USERS_REQUEST_ENDED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .set('entities', fromJS(action.payload.data).map((user) => new UserRecord(user)));
    case TOGGLE_USER_STATUS:
      return state
        .update('entities', users => {
          return users.map((user) => {
            if (user.get('email') === action.payload.userId) {
              return user.set('isActive', !user.get('isActive'));
            }
            return user;
          })
        })
    default: return state;
  }
}
