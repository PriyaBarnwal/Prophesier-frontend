import React from 'react';
import { Button } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux'
import {addImage} from '../actions/imagesActions' 

const ImageUploader = ({addImage, images}) => {
  const maxNumber = 5;
 
  const onChange = (imageList, index) => {
    let values = {}
    index.map(i => {
      let name = imageList[i].file.name
      values[name] =  {
          ...imageList[i], 
          name
        }
    })
    addImage(values);
  };
 
  return (
    <div>
      <ImageUploading
        multiple={true}
        value={Object.values(images)}
        acceptType={['jpg', 'png', 'jpeg']}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div>
          <div className="buttons" {...dragProps} style={isDragging? {padding:'10px 0 10px 0', backgroundColor: 'grey'}: {padding:'10px 0 10px 0'}} >
              <CloudUploadIcon fontSize="large"/>
                <p className="image-drop-title">{"Drag & Drop to Upload Files"}</p>
                <p style={{margin: '0 0 15px 0', fontSize: '12px'}}>OR</p>
                <Button onClick={onImageUpload} color="primary" variant="outlined" style={{backgroundColor: 'white', fontSize: '0.7rem'}}>Browse</Button>
          </div>

          </div>
        )}
      </ImageUploading>
    </div>
  );
}
const mapStateToProps = state => ({
  images: state.images.images
})

export default connect(mapStateToProps, { addImage })(ImageUploader);
