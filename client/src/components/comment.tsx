import { Grid, IconButton, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import IComment from '../interfaces/comment_interface';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../context/user_context';
import { gql, useMutation } from '@apollo/client';

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
      }
      commentCount
    }
  }
`;

const Comment = ({
  postId,
  comment,
}: {
  comment: IComment;
  postId: string;
}) => {
  const context = useContext(UserContext);
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      postId,
      commentId: comment.id,
    },
    onError(err) {
      console.error('Delete comment error ', err);
    },
  });

  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography key={comment.id} component='span'>
          {comment.userName + ' :    '}
          {comment.description}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {comment.userEmail === context?.user?.email && (
          <IconButton onClick={() => deleteComment()}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Comment;
