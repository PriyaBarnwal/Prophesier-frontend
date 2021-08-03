import { combineReducers } from 'redux'
import imagesReducer from './imagesReducer'
import accountsReducer from './accountsReducer'
import postsReducer from './postsReducer'

export default combineReducers({
  images: imagesReducer,
  accounts: accountsReducer,
  posts: postsReducer
})