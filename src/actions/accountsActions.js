import axios from 'axios'
import {CLEAR_ACCOUNT, GET_ACCOUNT, ACCOUNT_ERROR, SET_LOADING} from './constants'
import { updatePost } from './postsActions'

export const clearAccount = () => (dispatch) => {
    dispatch({
      type: CLEAR_ACCOUNT,
      payload: null
    })
}

export const loadAccount = (formData) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })

  try {
    let res = await axios.get(`http://127.0.0.1:8895/account_details/${formData.username}`, formData)

    if(res.data.error) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: res.data.error.message
          })

        return
    }
    let data = res.data.business_discovery
    dispatch({
      type: GET_ACCOUNT,
      payload: data
    })
    
    dispatch(updatePost({...formData, nfollowers: data.nfollowers_count, profile_url: data.profile_picture_url}))
    return data
  } catch(err) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err }
    })
  }
}