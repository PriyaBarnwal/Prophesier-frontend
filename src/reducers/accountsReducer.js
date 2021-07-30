import {
    CLEAR_ACCOUNT, 
    GET_ACCOUNT, 
    ACCOUNT_ERROR,
    SET_LOADING
  } from '../actions/constants'
  
  const initialState = {
    selected_account: null,
    error: "",
    loading: false
  }
  
  const accountsReducer = (state=initialState, action) => {
    let {type, payload} = action
  
    switch(type) {
      case SET_LOADING:
        return {
          ...state,
          loading: payload
        }
      case GET_ACCOUNT:
        return {
          ...state,
          selected_account: payload,
          loading: false,
          error: ''
        }
      case CLEAR_ACCOUNT:
        return {
          ...state,
          selected_account: null,
        }
      case ACCOUNT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          selected_account: null
        };
      default: 
        return state
    }
  }
  
export default accountsReducer