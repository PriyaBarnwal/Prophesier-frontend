import React, {Fragment} from 'react';
import { Grid, LinearProgress, Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux'
import CardItem from '../Components/CardItem';
import ScoreItems from '../Components/ScoreItems';
import {removeImage} from '../actions/imagesActions'
import placeholder from '../assets/placeholder.png'

const MainPanel= ({images, post, scores, removeImage, loading}) => {
  let {caption} = post
  let num_of_images = Object.keys(images).length,
    num_of_placeholder = 4 - num_of_images,
    placeholders= []

    for(let i=0;i<num_of_placeholder;i++) {
      placeholders.push(
        <div style={{marginTop: '5px'}}>
          <img 
          src={placeholder}
          alt='placeholder'
          className="image-tile" 
          height={330}
          width={370}
          />
        </div>
      )}

  let image_keys = Object.keys(images)
  return  (
    <Fragment>
      <Backdrop style={{zIndex: 101, color: '#fff'}} open={loading}><CircularProgress thickness={4} size={50} /></Backdrop>
      <Grid item container xs={8} direction="column" style={{position: 'relative'}}>
      {/* {loading === true ? (<div style={{width: '100%', marginBottom: '10px'}}><LinearProgress /></div>): null} */}
      <div elevation={3} style={{background: scores.length > 0? 'transparent': 'white', minHeight: '700px'}}>
      {scores.length === 0?
        (
        <div className="imageslist">
            {image_keys && image_keys.map((key, index) => (
              <div key={key} className="images">
                <CardItem image={images[key].data_url} onRemove={()=>removeImage(key)} caption={caption}/>
              </div>
            ))}
            {placeholders}
        </div>): (
        <ScoreItems scores={scores} caption={caption} images={images}  onRemove={removeImage}/>
      )}
      </div>
    </Grid>
  </Fragment>
  );
}

const mapStateToProps = state => ({
    images: state.images.images,
    post: state.posts.post,
    scores: state.posts.scores,
    loading: state.posts.loading
  })
    
  export default connect(mapStateToProps, { removeImage})(MainPanel);
