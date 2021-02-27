import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../context/user_context';
import IPost from '../interfaces/post_interface';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import IUser from '../interfaces/user_interface';
import Comment from './comments';
import Like from './like';

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
  query getUser($email: String!) {
    getUser(email: $email) {
      id
      userName
      email
      picUrl
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const PostComponent = ({ post }: { post: IPost }) => {
  const [owner, setOwner] = useState<IUser | null>();
  const { loading, data: { getUser: user } = {}, error } = useQuery(
    FETCH_USER_DATA,
    {
      variables: {
        email: post.userEmail,
      },
      onError(err) {
        console.log('Get user error', err);
      },
    }
  );

  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId: post.id,
    },
    update(proxy, result) {
      console.log(result);
      const data: any = proxy.readQuery({ query: FETCH_POST_QUERY });
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: data.getPosts.filter(
            (cachePost: IPost) => cachePost.id !== post.id
          ),
        },
      });
    },
    onError(err) {
      console.log('Delete Post Error', err);
    },
  });

  useEffect(() => {
    setOwner(user);
  }, [user]);

  const context = useContext(UserContext);

  return (
    <Grid container style={{ maxWidth: '700px', margin: '26px' }}>
      <Card>
        <CardContent>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='flex-start'
          >
            <CardMedia
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '40px',
                padding: '.2rem',
                marginRight: '10px',
              }}
              component='img'
              src={owner?.picUrl}
            />
            <Link
              style={{
                height: '100%',
                color: 'black',
                flex: '1',
              }}
              to={`/profile/${owner?.id}`}
            >
              <Typography variant='h5'>{owner?.userName}</Typography>
            </Link>

            {owner?.id === context?.user?.id && (
              <IconButton onClick={() => deletePostMutation()}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>

          <Grid container item xs={12} style={{ padding: '30px' }}>
            <CardMedia src={post.picUrl} component='img' />
          </Grid>

          <Grid container>
            <Typography variant='body1'>
              <strong>{post.description}</strong>
            </Typography>

            <Grid
              container
              style={{
                margin: '5px 5px',
                borderBottom: '1px solid grey',
              }}
            />
            <Like post={post} />

            <Comment post={post} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostComponent;
