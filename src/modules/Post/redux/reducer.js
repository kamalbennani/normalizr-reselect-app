import { Map, List, fromJS, Record } from 'immutable';
import axios from 'axios';
import omit from 'lodash/omit';
import sample from 'lodash/sample';

const FETCH_POSTS_REQUEST_STARTED = 'users/FETCH_POSTS_REQUEST_STARTED';
const FETCH_POSTS_REQUEST_ENDED = 'users/FETCH_POSTS_REQUEST_ENDED';
const FETCH_POSTS_REQUEST_FAILED = 'users/FETCH_POSTS_REQUEST_FAILED';

export const fetchPostsList = users => dispatch => {
  // Starting the fetching request
  dispatch({
    type: FETCH_POSTS_REQUEST_STARTED,
  });
  return axios.get('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    // Getting the response    
    if (response.data) {
      return dispatch({
        type: FETCH_POSTS_REQUEST_ENDED,
        payload: {
          data: response.data.map(post => ({
            ...omit(post, 'userId'),
            user: sample(users),
          })),
        }
      })
    }

    return dispatch(fetchPostsFailed());
  })
  .catch(() => dispatch(fetchPostsFailed()));
}

const fetchPostsFailed = () => {
  return {
    type: FETCH_POSTS_REQUEST_FAILED,
    payload: {
      error: 'Something went wrong',
    }
  }
}

const PostRecord = Record({
  title: null,
  body: null,
  user: null,
})

const initialState = Map({
  entities: List(),
  _metadata: Map({
    fetching: false,
    error: null,
  })
})

export const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_POSTS_REQUEST_STARTED:
      return state.setIn(['_metadata', 'fetching'], true);
    case FETCH_POSTS_REQUEST_FAILED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'error'], action.payload.error);
    case FETCH_POSTS_REQUEST_ENDED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .set('entities', fromJS(action.payload.data).map((post) => new PostRecord(post)));
    default: return state;
  }
}
