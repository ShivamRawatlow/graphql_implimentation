import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import UserContext from '../context/user_context';
import uploadPic from '../utils/upload_pic';
import routeNames from '../utils/routeNames';
import { Clear, PhotoCamera } from '@mui/icons-material';
import FileSelector from './file_selector/file_selector';
import { useCreatePostMutation } from '../generated/graphql';
import graphqlRequestClient from '../graphQLRequestClient';
import { useErrorHandler } from '../utils/use_error_handler';
import { useAuthentication } from '../utils/use_authentication';

const CreatePost = () => {
  const [description, setDescription] = useState('Long long time ago.....');
  const [showImageDiv, setShowImageDiv] = useState(false);
  const [openDropzone, setOpenDropZone] = useState(false);
  const authentication = useAuthentication();
  const errorHandler = useErrorHandler();
  const [picUrl, setPicUrl] = useState('');
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useCreatePostMutation(graphqlRequestClient, {
    onSuccess() {
      context?.setAlert({
        message: 'Post Created',
        severity: 'success',
      });
      navigate(routeNames.home);
    },
    onError(err: any) {
      errorHandler.checkError(err);
    },
  });

  const handleCreatePost = () => {
    authentication.checkAuthentication(() =>
      mutate({
        description,
        picUrl,
      })
    );
  };

  const handleOnSave = async (file: File) => {
    try {
      const picUrl = await uploadPic(file);
      setPicUrl(picUrl);
      setShowImageDiv(true);
    } catch (error: any) {
      console.log(error.message);
      context?.setAlert({
        message: 'unable to upload the image',
        severity: 'error',
      });
    }
    handleCloseDropZone();
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
      <FileSelector
        openDropzone={openDropzone}
        setOpenDropZone={setOpenDropZone}
        uploadFunction={handleOnSave}
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
            {showImageDiv && (
              <Grid container justifyContent='center'>
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
            )}

            <Grid container justifyContent='space-between' direction='row'>
              {showImageDiv ? (
                <IconButton onClick={handleCancelPhoto}>
                  <Clear />
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
