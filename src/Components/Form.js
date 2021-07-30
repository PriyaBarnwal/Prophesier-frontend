import React, {useState} from 'react'
import { TextField, FormControl, IconButton, Avatar, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux'
import {updatePost} from '../actions/postsActions'
import {loadAccount} from '../actions/accountsActions'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Form = ({formStoreValues, loading, updatePost, error, loadAccount}) => {
  let [formValues, setFormValues] = useState(formStoreValues)
  let [emojiPickerDisplay, toggleDisplay] = useState(false)
  let {caption, nfollowers, publishDate, username, profile_url} = formValues
  
  const handleChange = (e) => setFormValues({
    ...formValues,
    [e.target.id]: e.target.value
  });

  const setEmoji =(emoji) => setFormValues({
    ...formValues,
    caption : caption+emoji
  })
  const toggleEmojiPicker = ()=> {
    toggleDisplay(!emojiPickerDisplay)
  }

  
  const onBlur = (event) => {
    event.preventDefault()
    updatePost(formValues)
  }

  const handleAccountChange = async(event) => {
    event.preventDefault()
    if( formValues.username.length>0) {
      let data = await loadAccount(formValues)
      data && setFormValues({
        ...formValues,
        nfollowers: data.nfollowers_count, profile_url: data.profile_picture_url
      })
    }
  }

  const onKeyUp = (event) => {
    if (event.which === 13 || event.key == 'enter') {
    event.preventDefault()
    handleAccountChange(event)
    }
  }

  return (
    <form noValidate autoComplete="off">
      <Avatar alt={username}  style={{height: 120, width: 120, margin: 'auto'}} src={profile_url}/>
        <FormControl style={{margin: '15px 0'}} fullWidth={true}>
            <TextField
                id="username"
                label="Account Handle"
                value={username}
                onChange={handleChange}
                variant="standard"
                size="small"
                disabled={loading}
                error={error ? true: false}
                required={true}
                onKeyUp={onBlur}
                onBlur={handleAccountChange}
                helperText={error}
                onKeyPress={onKeyUp}
            />
            {loading && <CircularProgress class="load-account"/>}
            </FormControl>
            <FormControl  style={{margin: '15px 0'}} fullWidth={true}>
            <TextField
                id="publishDate"
                label="When do you intend to post it?"
                type="datetime-local"
                defaultValue={publishDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                required={true}
                onBlur={onBlur}
            />
            </FormControl>
            <FormControl style={{margin: '15px 0'}} fullWidth={true}>
            <TextField
                id="caption"
                label="What's on your mind?"
                multiline
                rows={4}
                value={caption}
                onChange={handleChange}
                variant="outlined"
                required={true}
                onBlur={onBlur}
                disabled={loading}
            />
            <IconButton style={{position: 'absolute', right: 0, bottom: 0}}  onClick={toggleEmojiPicker}><EmojiEmotionsIcon fontSize="small"/></IconButton>
            {emojiPickerDisplay && (
            <Picker
              className="emoji-picker"
              title="Pick your emoji"
              emoji="point_up"
              onSelect={emoji => setEmoji(emoji.native)}
            />
            )}
      </FormControl>
    </form>
  )
}

const mapStateToProps = state => ({
  formStoreValues: state.posts.post,
  loading: state.accounts.loading,
  error: state.accounts.error
})
  
export default connect(mapStateToProps, { updatePost, loadAccount})(Form);