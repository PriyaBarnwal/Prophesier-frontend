import React, { Fragment, useState } from 'react';
import { Paper, IconButton } from '@material-ui/core';
import CardItem from './CardItem'
import GaugeChart from 'react-gauge-chart'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const ScoreItems = ({scores, caption, images}) => {
  const numSlides = scores.length/2 -1
  let [rightArrowVisible, setRightArrowVisible] = useState(scores.length>2)
  let [leftArrowVisible, setLeftArrowVisible] = useState(false)
  let [slide, setSlide] = useState(0)

  const rightArrowClicked = () => {
    if(slide === numSlides -1) {
      setRightArrowVisible(false)
    }
    setSlide(slide+1)
    if(slide===0)
      setLeftArrowVisible(true)
  }

  const leftArrowClicked = () => {
    if(slide === 1) {
      setLeftArrowVisible(false)
      setRightArrowVisible(true)
    }
    setSlide(slide-1)
  }
  
  let until = (2+ (slide*2))>scores.length? scores.length -1: (2+ (slide*2))
  scores = scores.map(score => {
    score['category'] = score.score>0.7? 'High': score.score<0.35? 'Low': 'Medium'
    return score
  })

  let updatedScores = scores.slice(slide*2,until)

  return (
    <Fragment>
      <IconButton onClick={leftArrowClicked} style={{visibility:leftArrowVisible ? 'visible': 'hidden', position: 'absolute', top: '45%', left: 5}}><ArrowBackIosIcon fontSize="large" /></IconButton>
      <IconButton onClick={rightArrowClicked} style={{visibility: rightArrowVisible ? 'visible': 'hidden', position: 'absolute', top: '45%', right: -5}}><ArrowForwardIosIcon fontSize="large" /></IconButton>
      <div style={{display: 'flex', flexDirection: 'column', padding: '0 20px', justifyContent: 'space-between'}}>
          {updatedScores.map((score, index) => (
              <Paper key={index} className="images" style={{display: 'flex', marginTop: index%2===0? 0: '15px'}} elevation={3}>
                <CardItem image={images[score.name].data_url} caption={caption} view={'score'}/>
                <div style={{margin: '0 auto'}}>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h3 style={{textAlign: 'center'}}>Predicted Engagement: </h3>
                    <h3 style={{marginLeft: '15px'}} className={score.category}>{score.category}</h3>
                  </div>
                  <GaugeChart id="gauge-chart5"
                    style={{height: 160, width: 350, marginTop: '30px'}}
                    textColor="#000"
                    nrOfLevels={40}
                    colors={['#EA4228', '#F5CD19','#5BE12C']}
                    needleColor="#a8b2f3"
                    needleBaseColor="#a8b2f3"
                    percent={score.score}
                    arcPadding={0.01}
                  />
                </div>
              </Paper>
            ))
          }
      </div>
    </Fragment>
  );
}

export default ScoreItems
