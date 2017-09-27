import { Map, List, fromJS, Record } from 'immutable';
import axios from 'axios';
import omit from 'lodash/omit';
import sample from 'lodash/sample';
import { normalize, schema } from 'normalizr';
import { userSchema } from '../../User/redux/schema';
// Schemas
const postSchema = new schema.Entity('posts', {
  author: userSchema,
}, {
  idAttribute: 'id',
});

// Action Types
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
      const posts = response.data.map(post => ({
        ...omit(post, 'userId'),
        // Get random author
        author: sample(users),
      }));

      const normalizedData = normalize(posts, [postSchema]);
      
      return dispatch({
        type: FETCH_POSTS_REQUEST_ENDED,
        payload: {
          posts: normalizedData.entities.posts,
          ids: normalizedData.result,
        }
      })
    }

    return dispatch(fetchPostsFailed());
  })
  .catch((error) => {
    console.log('error', error);
    return dispatch(fetchPostsFailed());
  });
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
  author: null,
})

const initialState = Map({
  entities: Map(),
  ids: List(),
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
        .set('entities', fromJS(action.payload.posts).map((post) => new PostRecord(post)))
        .set('ids', fromJS(action.payload.ids));
    default: return state;
  }
}
