import { Favorite } from '@mui/icons-material';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../context/user_context';
import IPost from '../interfaces/post_interface';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  GetPostsQuery,
  LikePostMutation,
  useLikePostMutation,
} from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorHandler } from '../utils/use_error_handler';
import { useAuthentication } from '../utils/use_authentication';

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const Like = ({ post }: { post: IPost }) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const authentication = useAuthentication();
  const context = useContext(UserContext);
  const { mutate } = useLikePostMutation(graphqlRequestClient, {
    onSuccess(responseData) {
      queryClient.setQueryData(
        ['getPosts'],
        (oldData: GetPostsQuery | undefined) =>
          updateCache(responseData, oldData)
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
      })
    );
  };

  const updateCache = (
    responseData: LikePostMutation,
    oldData: GetPostsQuery | undefined
  ) => {
    if (!oldData?.getPosts) return oldData;
    const newData = oldData.getPosts.map((element) => {
      if (element?.id !== post.id) return element;
      return {
        ...element,
        likeCount: responseData.likePost.likeCount,
        likes: responseData.likePost.likes,
      };
    });
    return { getPosts: newData };
  };

  const liked =
    context?.user &&
    post.likes.find((like) => like.userEmail === context.user?.email);

  return (
    <Box sx={containerStyle}>
      <IconButton onClick={mutationCallback}>
        {liked ? (
          <Favorite fontSize='small' />
        ) : (
          <FavoriteBorderIcon fontSize='small' />
        )}
      </IconButton>
      <span>{post.likeCount}</span>
    </Box>
  );
};

export default Like;
