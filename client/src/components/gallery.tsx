import { gql, useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IPost from '../interfaces/post_interface';
import IUser from '../interfaces/user_interface';

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

const Gallery = ({ user }: { user: IUser }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { loading, data: { getPosts: getPostsData } = {} } = useQuery(
    FETCH_POST_QUERY
  );

  useEffect(() => {
    setPosts(getPostsData || []);
  }, [getPostsData]);

  return (
    <Grid container direction='row'>
      {posts.map((post: IPost) => {
        return (
          <Grid key={post.id} item lg={4} md={6} xs={12}>
            <Card style={{ maxWidth: '250px' }} variant='outlined'>
              <CardContent>
                <Grid container justify='center'>
                  {post.picUrl ? (
                    <CardMedia
                      component='img'
                      src={post.picUrl}
                      style={{
                        height: '200px',
                        width: '200px',
                      }}
                    />
                  ) : (
                    <Typography
                      align='center'
                      variant='h4'
                      style={{
                        height: '200px',
                        width: '200px',
                      }}
                    >
                      POST
                    </Typography>
                  )}
                  <Typography style={{ marginTop: '10px' }} variant='body1'>
                    {post.description}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Gallery;
