import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../components/gallery';
import { CardMedia, Grid, Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

const FETCH_USER_DATA = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      userName
      email
      picUrl
    }
  }
`;

const UserProfile = () => {
  const { userId }: any = useParams();

  const { loading, data: { getUser: user } = {}, error } = useQuery(
    FETCH_USER_DATA,
    {
      variables: {
        ID: userId,
      },
    }
  );

  const getUserProfile = async (setUserProfile: any, userId: any) => {};

  const followUser = async (userId: any) => {};

  const unfollowUser = async (followId: any) => {};

  return (
    <>
      {loading ? (
        <Typography></Typography>
      ) : (
        <Grid container justify='center'>
          <Grid
            container
            item
            xs={10}
            style={{ margin: '18px 0px', borderBottom: '1px solid grey' }}
            alignItems='center'
          >
            <Grid item md={6} xs={12}>
              <CardMedia
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                }}
                component='img'
                src={user?.picUrl || ''}
              />
            </Grid>

            <Grid
              container
              direction='column'
              alignItems='flex-start'
              item
              md={6}
              xs={12}
            >
              <Typography variant='h4'>{user?.userName}</Typography>
              <Typography variant='h5'>{user?.email}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Gallery user={user} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default UserProfile;
