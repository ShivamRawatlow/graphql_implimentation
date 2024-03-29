import IPost from '../interfaces/post_interface';
import { Box, SxProps, Theme } from '@mui/material';
import { useGetPostsQuery } from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';
import LoadingScreen from '../components/loading_screen';
import ErrorScreen from '../error_screen';
import PostComponent from '../components/post_component/post_component';

const homPageStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const Home = () => {
  const { isLoading, data, error, isError } =
    useGetPostsQuery(graphqlRequestClient);
  const posts = data?.getPosts;

  if (isError) {
    console.error(error);
    return <ErrorScreen />;
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Box sx={homPageStyle}>
        {posts &&
          posts.map((post) => (
            <PostComponent key={post?.id} post={post as IPost} />
          ))}
      </Box>
    </>
  );
};

export default Home;
