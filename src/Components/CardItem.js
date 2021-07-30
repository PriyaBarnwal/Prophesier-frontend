import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const CardItem = ({image, caption, view,  onRemove}) => {

  return (
    <Card className="root"style={{margin: view==='score'? '0': '10px 0'}}>
      <CardActionArea>
        <CardMedia 
          style={{backgroundSize: 'contain'}}
          className="media"
          image={image}
        />
        {view === 'score'? null: (
          <div 
          onClick={onRemove} 
          className='delete'
        >
          <CancelIcon/>
        </div>
        )}
      
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {caption}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardItem
