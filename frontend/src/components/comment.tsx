import { Box, SxProps, Theme, Typography } from '@mui/material';
import React, { useContext } from 'react';
import IComment from '../interfaces/comment_interface';
import { Delete } from '@mui/icons-material';
import UserContext from '../context/user_context';
import { GetPostsQuery, useDeleteCommentMutation } from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '../utils/use_error_handler';
import { useAuthentication } from '../utils/use_authentication';

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const commentSpace: SxProps<Theme> = {
  maxWidth: '70%',
  overflowWrap: 'break-word',
};

const Comment = ({
  postId,
  comment,
}: {
  comment: IComment;
  postId: string;
}) => {
  const authentication = useAuthentication();
  const context = useContext(UserContext);
  const queryClient = useQueryClient();
  const errorHandler = useErrorHandler();
  const { mutate } = useDeleteCommentMutation(graphqlRequestClient, {
    onSuccess() {
      queryClient.setQueryData(['getPosts'], updateCache);
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  const updateCache = (oldData: GetPostsQuery | undefined) => {
    if (!oldData?.getPosts) return oldData;
    const newData = oldData.getPosts.map((element) => {
      if (element?.id !== postId) return element;
      const newComments = element.comments.filter((e) => e?.id !== comment.id);
      return {
        ...element,
        comments: newComments,
      };
    });
    return { getPosts: newData };
  };

  const mutationCallback = () => {
    authentication.checkAuthentication(() =>
      mutate({
        postId,
        commentId: comment.id,
      })
    );
  };

  return (
    <Box sx={containerStyle}>
      <Typography key={comment.id} component='span' sx={commentSpace}>
        <strong>{comment.userName + ' '}</strong>
        {comment.description}
      </Typography>
      {comment.userEmail === context?.user?.email && (
        <button className={`icon_button`} onClick={mutationCallback}>
          <Delete fontSize='small' />
        </button>
      )}
    </Box>
  );
};

export default Comment;
