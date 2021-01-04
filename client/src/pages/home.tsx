import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import Post from '../components/post';


const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      description
      createdAt
      userName
      likeCount
      likes {
        userName
      }
      commentCount
      comments {
        id
        userName
        createdAt
        description
      }
    }
  }
`;

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POST_QUERY
  );


  console.log('Post data', posts);

  return (
    <Grid container justify='center'>
      <Grid item>
        <Typography variant='h3'>Recent Posts</Typography>
      </Grid>
      {loading ? (
        <Typography variant='h5'>Loading posts</Typography>
      ) : (
        posts &&
        posts.map((post: any) => (
          <Grid item key={post.id}>
            <Post post={post} />
          </Grid>
        ))
      )}
      <Grid item></Grid>
    </Grid>
  );
};

export default Home;
