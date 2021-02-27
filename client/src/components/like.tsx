import { useMutation } from '@apollo/client';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user_context';
import IPost from '../interfaces/post_interface';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        userEmail
      }
    }
  }
`;

const Like = ({ post }: { post: IPost }) => {
  const context = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: post.id,
    },
    onError(err) {
      console.log('Like error', err);
    },
  });

  useEffect(() => {
    if (
      context?.user &&
      post.likes.find((like) => like.userEmail === context.user?.email)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [context?.user, post.likes]);

  return (
    <Grid container justify='flex-start' alignItems='center'>
      <IconButton onClick={() => likePost()}>
        {liked ? <Favorite /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant='h6'>{post.likeCount}</Typography>
    </Grid>
  );
};

export default Like;
