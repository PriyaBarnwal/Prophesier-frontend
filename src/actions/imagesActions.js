import {REMOVE_IMAGE, ADD_IMAGE, REMOVE_ALL} from './constants'

export const removeImage = (image_name) => (dispatch) => {
    dispatch({
      type: REMOVE_IMAGE,
      payload: image_name
    })
}

export const addImage = (data) => (dispatch) => {
    dispatch({
      type: ADD_IMAGE,
      payload: data
    })
}

export const removeAll = () => (dispatch) => {
    dispatch({
        type: REMOVE_ALL,
        payload: null
    })
}