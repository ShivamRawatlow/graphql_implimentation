import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
//@ts-ignore
import { DropzoneDialog } from 'material-ui-dropzone';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import UserContext from '../context/user_context';
import uploadPic from '../utils/upload_pic';
import { gql, useMutation } from '@apollo/client';
import alertSeverity from '../utils/alert-severity';
import routeNames from '../utils/routeNames';

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

const CREATE_POST_MUTATION = gql`
  mutation createPost($description: String!, $picUrl: String) {
    createPost(description: $description, picUrl: $picUrl) {
      id
      description
      picUrl
      createdAt
      userEmail
    }
  }
`;

const CreatePost = () => {
  const [description, setDescription] = useState('Long long time ago.....');
  const [showImageDiv, setShowImageDiv] = useState(false);
  const [openDropzone, setOpenDropZone] = useState(false);
  const [picUrl, setPicUrl] = useState('');
  const context = useContext(UserContext);
  const [errors, setErrors] = useState<any>({});
  const history = useHistory();

  const [createPostMutation] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      description,
      picUrl,
    },

    update(proxy, result) {
      const data: any = proxy.readQuery({ query: FETCH_POST_QUERY });

      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      }); 

      context?.setAlert({
        message: 'Post Created',
        severity: alertSeverity.success,
      });
      history.push(routeNames.home);
    },
    onError(err) {
      context?.setAlert({
        message: 'Unable to create post',
        severity: alertSeverity.error,
      });
      const errorData = err.graphQLErrors[0]?.extensions?.exception?.errors;
      console.log('CreatePostError', err);
      setErrors(errorData || {});
    },
  });

  const handleCreatePost = async () => {
    createPostMutation();
  };

  const handleOnSave = async (files: File[]) => {
    const fileData = files[0];
    handleCloseDropZone();
    if (!fileData) {
      context?.setAlert({
        message: 'no file selected',
        severity: alertSeverity.error,
      });
      return;
    }

    try {
      const picUrl = await uploadPic(fileData);
      setPicUrl(picUrl);
      setShowImageDiv(true);
    } catch (error) {
      console.log(error.message);
      context?.setAlert({
        message: 'unable to upload the image',
        severity: alertSeverity.error,
      });
    }
  };

  const handleCloseDropZone = () => {
    setOpenDropZone(false);
  };

  const handleOpenDropZone = () => {
    setOpenDropZone(true);
  };

  const handleCancelPhoto = () => {
    setShowImageDiv(false);
    setPicUrl('');
  };

  return (
    <>
      <DropzoneDialog
        open={openDropzone}
        onSave={handleOnSave}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        filesLimit={1}
        maxFileSize={5000000}
        onClose={handleCloseDropZone}
      />
      <Grid
        style={{
          margin: '30px auto',
          maxWidth: '80%',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Card variant='outlined'>
          <CardContent>
            <TextField
              label='Tell Your Tale'
              multiline
              rows={4}
              variant='outlined'
              value={description}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
            {showImageDiv ? (
              <Grid container justify='center'>
                <CardMedia
                  style={{
                    width: '80%',
                    height: '80%',
                    margin: '20px',
                  }}
                  src={picUrl}
                  component='img'
                />
              </Grid>
            ) : null}

            <Grid container justify='space-between' direction='row'>
              {showImageDiv ? (
                <IconButton onClick={handleCancelPhoto}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenDropZone}>
                  <PhotoCamera />
                </IconButton>
              )}
              <Button onClick={handleCreatePost}>CreatePost</Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default CreatePost;
