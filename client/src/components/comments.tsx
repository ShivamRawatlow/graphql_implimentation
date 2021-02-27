import { Button, Grid, TextField } from '@material-ui/core';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import IComment from '../interfaces/comment_interface';
import IPost from '../interfaces/post_interface';
import { useMutation } from '@apollo/client';
import Comment from './comment';

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $description: String!) {
    createComment(postId: $postId, description: $description) {
      id
      comments {
        id
        userEmail
        userName
        description
      }
    }
  }
`;

const Comments = ({ post }: { post: IPost }) => {
  const [description, setDescription] = useState('');

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId: post.id,
      description,
    },
  });

  return (
    <>
      {post.comments.map((comment: IComment) => {
        return <Comment key={comment.id} postId={post.id} comment={comment} />;
      })}

     
      <Grid container>
        <Grid item xs={10}>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder='add comment'
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              createComment();
              setDescription('');
            }}
          >
            Comment
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Comments;
