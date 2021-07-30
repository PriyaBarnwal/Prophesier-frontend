import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import logo from '../assets/logo.png'
 
const Header= () => {
  return (
    <AppBar position="static" >
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      
  <img src={logo} alt="Khoros logo" height={40} style={{margin: '0 10px'}}/>
    </IconButton>
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Typography variant="h6" style={{'flexGrow': 1, fontWeight: 700}}>
      Engagement Prophesier
    </Typography>
    {/* <Typography variant="caption" style={{'flexGrow': 1, fontSize: '14px',color: 'white'}}>
      Predicts the popularity of an insta media post before publishing!!
    </Typography> */}
    </div>
  </Toolbar>
</AppBar>

  );
}

export default Header;
