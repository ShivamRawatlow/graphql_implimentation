import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user_context';
import IPost from '../../interfaces/post_interface';
import Comment from '../comments';
import Like from '../like';
import {
  GetPostsQuery,
  useDeletePostMutation,
  useGetUserQuery,
} from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import { useQueryClient } from '@tanstack/react-query';
import styles from './style.module.scss';
import { useErrorHandler } from '../../utils/use_error_handler';
import { useAuthentication } from '../../utils/use_authentication';

const PostComponent = ({ post }: { post: IPost }) => {
  const errorHandler = useErrorHandler();
  const queryClient = useQueryClient();
  const context = useContext(UserContext);
  const authentication = useAuthentication();

  const { data } = useGetUserQuery(graphqlRequestClient, {
    email: post.userEmail,
  });
  const user = data?.getUser;

  const { mutate } = useDeletePostMutation(graphqlRequestClient, {
    onSuccess() {
      queryClient.setQueryData(['getPosts'], updateCache);
      context?.setAlert({
        message: 'Post Deleted Successfully',
        severity: 'success',
      });
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  const updateCache = (oldData: GetPostsQuery | undefined) => {
    if (!oldData?.getPosts) return oldData;
    const newData = oldData.getPosts.filter((element) => {
      return element?.id !== post.id;
    });
    return { getPosts: newData };
  };

  const mutationCallback = () => {
    authentication.checkAuthentication(() =>
      mutate({
        postId: post.id,
      })
    );
  };

  return (
    <div className={`card card_shadow ${styles.post_container}`}>
      <div className={`${styles.post_header}`}>
        <img
          className={`${styles.post_profile_image}`}
          src={user?.picUrl}
          alt='User Profile Pic'
        />
        <Link
          className={`link_style font_weight_bold`}
          to={`/profile/${user?.email}`}
        >
          <span>{user?.userName}</span>
        </Link>

        {user?.id === context?.user?.id && (
          <button
            className={`margin_left_auto icon_button`}
            onClick={mutationCallback}
          >
            <DeleteIcon fontSize='small' />
          </button>
        )}
      </div>

      {post.picUrl && (
        <img
          className={`${styles.post_image}`}
          src={post.picUrl}
          alt='Post Pic'
        />
      )}

      <div className={`${styles.post_footer}`}>
        <span
          className={`${styles.post_description} grid_col_span_2 font_size_medium align_self_center`}
        >
          {post.description}
        </span>
        <div className={`justify_self_end`}>
          <Like post={post} />
        </div>
        <div className={`grid_col_span_3`}>
          <Comment post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
