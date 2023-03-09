import { Button, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import IComment from '../interfaces/comment_interface';
import IPost from '../interfaces/post_interface';
import Comment from './comment';
import {
  CreateCommentMutation,
  GetPostsQuery,
  useCreateCommentMutation,
} from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '../utils/use_error_handler';
import { useAuthentication } from '../utils/use_authentication';

const Comments = ({ post }: { post: IPost }) => {
  const authentication = useAuthentication();
  const [description, setDescription] = useState('');
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const { mutate } = useCreateCommentMutation(graphqlRequestClient, {
    onSuccess(responseData) {
      queryClient.setQueryData(
        ['getPosts'],
        (oldData: GetPostsQuery | undefined) =>
          updateCache(oldData, responseData)
      );
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  const mutationCallback = () => {
    authentication.checkAuthentication(() =>
      mutate({
        postId: post.id,
        description,
      })
    );
    setDescription('');
  };

  const updateCache = (
    oldData: GetPostsQuery | undefined,
    responseData: CreateCommentMutation
  ) => {
    if (!oldData?.getPosts) return oldData;
    const newData = oldData.getPosts.map((element) => {
      if (element?.id !== post.id) return element;
      return {
        ...element,
        comments: responseData.createComment.comments,
      };
    });
    return { getPosts: newData };
  };

  return (
    <>
      {post.comments.map((comment: IComment) => {
        return <Comment key={comment.id} postId={post.id} comment={comment} />;
      })}

      <div style={{ marginTop: '0.5rem' }}>
        <TextField
          fullWidth
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder='add a comment...'
          variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  disabled={description === ''}
                  onClick={mutationCallback}
                >
                  Comment
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};

export default Comments;
