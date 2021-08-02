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

  //formData = {...formData, images: ["https://massrel-pub.s3.amazonaws.com/prophesier/218117121_1156419151507712_7833246742053613423_n.jpg","https://massrel-pub.s3.amazonaws.com/prophesier/218997217_528538031680716_6453911982433415445_n.jpg", "https://massrel-pub.s3.amazonaws.com/prophesier/219267444_341084734283764_6995589128893583722_n.jpg","https://massrel-pub.s3.amazonaws.com/prophesier/219464127_825294765047428_2071299137545831423_n.jpg"]}
  // formData = {...formData, "images": [
  //   "https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/217416037_1017594055642732_264417975834050719_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=KMdRVuL8HLEAX8C4HyY&edm=AMO9-JQAAAAA&ccb=7-4&oh=a30066c1cd1e8eb2904f767a14fd7b75&oe=610B4DBC&_nc_sid=b9f2ee",
  //   "https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/221235318_195523132525018_5742261858596126313_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=N-aJ40qgcc0AX8vn0rb&edm=AMO9-JQAAAAA&ccb=7-4&oh=9f287dcd90c1fef4d530dfdc4dc061c8&oe=610C2642&_nc_sid=b9f2ee",
  //   "https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/217765686_178190184345384_3990347321338192220_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=andbqpD4pboAX_o9vUv&edm=AMO9-JQAAAAA&ccb=7-4&oh=8577ed3ed49846a370cdaa6e9402adfd&oe=610C5540&_nc_sid=b9f2ee",
  //   //"https://scontent.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/225129977_1228991937552180_995577556656129358_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=ZHzXiJ6BWboAX-ls9D-&edm=AMO9-JQAAAAA&ccb=7-4&oh=0a858b3ebf158ee17f2145b2a0b1bb5e&oe=610C3A55&_nc_sid=b9f2ee",
  //   "https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/188966032_173525451363586_9003413895904256679_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=n__FzCgq6noAX-vWOWA&edm=AGenrX8BAAAA&ccb=7-4&oh=ff9edf6b9f788779037b49cef4f230de&oe=610C1C9C&_nc_sid=5eceaa"
  // ]}
  try {
    let res = await axios.post(`http://localhost:8895/predict/`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }})

    let scores = []
    res.data.map((score, index) => {
        scores.push({
            score: (score[0]/Math.pow(formData.nfollowers,0.7)),
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