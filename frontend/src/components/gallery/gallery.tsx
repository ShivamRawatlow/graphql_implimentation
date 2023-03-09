import { useGetUserPostsQuery } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import IUser from '../../interfaces/user_interface';
import styles from './style.module.scss';

const Gallery = ({ user }: { user: IUser }) => {
  const { data } = useGetUserPostsQuery(graphqlRequestClient, {
    email: user.email,
  });

  const posts = data?.getUserPosts;

  return (
    <div className={`${styles.container}`}>
      {posts?.map((post) => {
        return (
          <div
            className={`${styles.post_container} card card_shadow`}
            key={post?.id}
          >
            {post?.picUrl ? (
              <img
                src={post.picUrl}
                className={styles.post_image}
                alt='Post pic URL'
              />
            ) : (
              <span
                className={`${styles.post_image} display_block font_size_extra_large`}
              >
                POST
              </span>
            )}
            <span className={`${styles.post_description}`}>
              {post?.description}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
