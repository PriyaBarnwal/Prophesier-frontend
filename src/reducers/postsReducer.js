import {
    CLEAR_POST,
    UPDATE_POST,
    PREDICT_LOADING,
    PREDICT_ERROR,
    UPDATE_SCORE
  } from '../actions/constants'
  
  const initialState = {
    post: {
        caption: '',
        username: '',
        publishDate: new Date().toISOString().split('.')[0],
        nfollowers: 0,
        profile_url: 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg'
    },
    scores: [],
    error: {},
    loading: false
  }

  const postsReducer = (state=initialState, action) => {
    let {type, payload} = action
  
    switch(type) {
      case PREDICT_LOADING:
        return {
          ...state,
          loading: payload
        }
      case CLEAR_POST:
        return initialState
      case UPDATE_POST:
        return {
          ...state,
          post: payload
        }
      case UPDATE_SCORE:
        return {
          ...state,
          scores: payload,
          loading: false
        }
      case PREDICT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default: 
        return state
    }
  }
  
export default postsReducer