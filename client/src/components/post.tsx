import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Post = ({ post }: any) => {
  const {
    description,
    createdAt,
    id,
    userName,
    likeCount,
    commentCount,
    likes,
  } = post;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://www.google.com/search?q=free+photos&sxsrf=ALeKk01TeAYKvyjDtNvfzB_LLlhD2EzZ1A:1609685775451&source=lnms&tbm=isch&sa=X&ved=2ahUKEwioxuHmgoDuAhXkoXEKHYUhAn8Q_AUoAXoECAYQAw&biw=1229&bih=578#imgrc=_2JirDBiGzi3lM'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {userName}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
          <Typography variant='body1' color='textSecondary' component='p'>
            {moment(createdAt).fromNow(true)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Like
        </Button>
        <Button size='small' color='primary'>
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
