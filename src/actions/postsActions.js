import axios from 'axios'
import {CLEAR_POST, UPDATE_POST, PREDICT_LOADING, UPDATE_SCORE, PREDICT_ERROR} from './constants'

export const clearPost = () => (dispatch) => {
    dispatch({
      type: CLEAR_POST,
      payload: null
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
export const predictEngagement = (formData) => async(dispatch) => {
  dispatch({
    type: PREDICT_LOADING,
    payload: true
  })

  formData = {...formData, images: ["https://massrel-pub.s3.amazonaws.com/prophesier/218117121_1156419151507712_7833246742053613423_n.jpg","https://massrel-pub.s3.amazonaws.com/prophesier/218997217_528538031680716_6453911982433415445_n.jpg", "https://massrel-pub.s3.amazonaws.com/prophesier/219267444_341084734283764_6995589128893583722_n.jpg","https://massrel-pub.s3.amazonaws.com/prophesier/219464127_825294765047428_2071299137545831423_n.jpg"]}
  try {
    let res = await axios.post(`http://localhost:8895/predict/`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }})

    let scores = []
    res.data.map((score, index) => {
        scores.push({
            score: score[0]/20000,
            numLikes: score[0],
            name: formData.media[index].name
        })
    })

    dispatch({
      type: UPDATE_SCORE,
      payload: scores
    })
    
  } catch(err) {
    dispatch({
      type: PREDICT_ERROR,
      payload: err
    })
    // let dummydata =  [
    //     {"name": "219596796_5757457314324652_3522190275390541485_n.jpg",
    //     "score": 0.74},
    //     {"name": "219614346_829648231272737_4748018843309780537_n.jpg",
    //     "score": 0.47},
    //     {"name": "219627941_543487130068815_2532937134271137986_n.jpg",
    //     "score": 0.54},
    //     {"name": "219652557_368137428013580_9166938166912675368_n.jpg",
    //     "score": 0.34}
    // ]

    // await sleep(30000)
    // dispatch({
    //     type: UPDATE_SCORE,
    //       payload: dummydata
    //     })
  }
}

export const updatePost = (data) => (dispatch) => {
    dispatch({
      type: UPDATE_POST,
      payload: data
    })
}