import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  SxProps,
  TextField,
  Theme,
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
import { useMutation } from '@tanstack/react-query';
import LoadingScreen from './loading_screen';

const imageStyle: SxProps<Theme> = {
  width: '80%',
  height: '80%',
  margin: '20px',
  objectFit: 'cover',
  objectPosition: 'center',
};

const CreatePost = () => {
  const [description, setDescription] = useState('Long long time ago.....');
  const [showImageDiv, setShowImageDiv] = useState(false);
  const [openDropzone, setOpenDropZone] = useState(false);
  const authentication = useAuthentication();
  const errorHandler = useErrorHandler();
  const [picUrl, setPicUrl] = useState('');
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate: uploadPicMutation, isLoading: uploadLoading } = useMutation(
    upload,
    {
      onError(err) {
        console.error(err);
        context?.setAlert({
          message: 'unable to upload the image',
          severity: 'error',
        });
        handleCloseDropZone();
      },
    }
  );
  const { mutate, isLoading } = useCreatePostMutation(graphqlRequestClient, {
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

  async function upload(file: File) {
    const picUrl = await uploadPic(file);
    setPicUrl(picUrl);
    setShowImageDiv(true);
    handleCloseDropZone();
  }

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

  const handleOnSave = async (file: File) => {
    authentication.checkAuthentication(() => uploadPicMutation(file));
  };

  return (
    <>
      {(isLoading || uploadLoading) && <LoadingScreen />}
      <FileSelector
        openDropzone={openDropzone}
        setOpenDropZone={setOpenDropZone}
        uploadFunction={handleOnSave}
        isProfile={false}
      />

      <Box>
        <Card
          variant='outlined'
          sx={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}
        >
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
                <CardMedia sx={imageStyle} src={picUrl} component='img' />
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
      </Box>
    </>
  );
};

export default CreatePost;
