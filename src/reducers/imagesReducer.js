import {
    REMOVE_IMAGE, 
    ADD_IMAGE,
    REMOVE_ALL
  } from '../actions/constants'
  
  const initialState = {
    images: {},
    error: {},
    loading: false
  }

  const imagesReducer = (state=initialState, action) => {
    let {type, payload} = action
  
    switch(type) {
      case ADD_IMAGE:
        return {
          ...state,
          images: {...state.images, ...payload}
        }
      case REMOVE_IMAGE:
          let images = state.images
          let {[payload]: omit, ...rest} = images
        return {
          ...state,
          images: rest,
        }
      case REMOVE_ALL:
        return initialState
      default: 
        return state
    }
  }
  
export default imagesReducer