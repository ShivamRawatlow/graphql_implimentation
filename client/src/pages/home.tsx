import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';
import PostComponent from '../components/post_component';
import IPost from '../interfaces/post_interface';

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      description
      picUrl
      createdAt
      userEmail
      likeCount
      likes {
        id
        userEmail
      }
      commentCount
      comments {
        id
        userName
        userEmail
        createdAt
        description
      }
    }
  }
`;

const FETCH_USER_DATA = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      userName
      email
      picUrl
    }
  }
`;


const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POST_QUERY
  );

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      {loading ? (
        <Typography variant='h5'>Loading posts</Typography>
      ) : (
        posts &&
        posts.map((post: IPost) => (
          <Grid item key={post.id}>
            <PostComponent post={post} />
          </Grid>
        ))
      )}
      <Grid item></Grid>
    </Grid>
  );
};

export default Home;
