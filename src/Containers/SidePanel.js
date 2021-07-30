import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { predictEngagement } from '../actions/postsActions'
import Form from '../Components/Form'
import ImageUploader from '../Components/ImageUploader'
import {removeAll} from '../actions/imagesActions'
import {clearPost} from '../actions/postsActions'
import {clearAccount} from '../actions/accountsActions'

const SidePanel= ({formData, images, predictEngagement, removeAll, clearPost, clearAccount}) => {
  const reset =() => {
    removeAll();
    clearPost();
    clearAccount();
  }
  return (
    <Grid item container xs={4} direction="column" spacing={3} className="side-panel">
        <Grid item>
        <Paper elevation={3} className="box">
            <Form/>
        </Paper>
        </Grid>
        <Grid item>
        <Paper elevation={3} className="">
            <ImageUploader/>
        </Paper>
        </Grid>
        <Grid item className="button-container">
        <Button variant="contained" className="side-button" style={{backgroundColor: '#ec4882', marginRight: '10px'}} fullWidth={true} onClick={reset}>
          RESET
        </Button>
        <Button variant="contained" className="side-button" style={{backgroundColor: '#3f51b5'}} fullWidth={true} onClick={()=>predictEngagement({...formData, media: Object.values(images)})}>
          PREDICT 
        </Button>
        </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  images: state.images.images,
  formData: state.posts.post
})
  
export default connect(mapStateToProps, { predictEngagement, removeAll, clearPost, clearAccount})(SidePanel);
