import PostComponent from '../components/post_component/post_component';
import IPost from '../interfaces/post_interface';
import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';
import { useGetPostsQuery } from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';

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
    return <div>Error In Fetching Posts</div>;
  }

  if (isLoading) {
    return <Typography variant='h5'>Loading posts</Typography>;
  }

  return (
    <Box sx={homPageStyle}>
      {posts &&
        posts.map((post) => (
          <PostComponent key={post?.id} post={post as IPost} />
        ))}
    </Box>
  );
};

export default Home;
