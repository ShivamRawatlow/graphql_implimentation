import React, { useEffect, useState, useContext } from 'react';
import uploadPic from '../utils/upload_pic';
//@ts-ignore
import { CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import UserContext from '../context/user_context';
import Gallery from '../components/gallery';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import AlertSeverity from '../utils/alert-severity';

const FETCH_ME = gql`
  query getMe {
    getMe {
      id
      userName
      email
      picUrl
    }
  }
`;

const UPDATE_PROFILE_PIC_MUTATION = gql`
  mutation updateProfilePic($picUrl: String!) {
    updateProfilePic(picUrl: $picUrl) {
      id
      picUrl
      token
    }
  }
`;

const Profile = () => {
  const { loading, data = {}, error } = useQuery(FETCH_ME);
  const [openDropzone, setOpenDropZone] = useState(false);
  const context = useContext(UserContext);

  const [updateProfilePic] = useMutation(UPDATE_PROFILE_PIC_MUTATION, {
    update(_, { data: { updateProfilePic: updateProfilePicData } }) {
      const updatedUser = Object.assign({}, context?.user);
      updatedUser.id = updateProfilePicData.id;
      updatedUser.picUrl = updateProfilePicData.picUrl;
      updatedUser.token = updateProfilePicData.token;
      context?.login(updatedUser);
      console.log(updatedUser);
    },
    onError(err) {
      console.log('Update Profile mutation error', err);
    },
  });

  const handleCloseDropZone = () => {
    setOpenDropZone(false);
  };
  const handleOpenDropZone = () => {
    setOpenDropZone(true);
  };

  const updateProfilePicUrl = async (pic: File[]) => {
    setOpenDropZone(false);
    try {
      const picUrl = await uploadPic(pic[0]);
      console.log('PicUrl after upload', picUrl);
      updateProfilePic({ variables: { picUrl } });
    } catch (err) {
      context?.setAlert({
        message: 'Unable to upload pic',
        severity: AlertSeverity.error,
      });
    }
  };

  return (
    <>
      <DropzoneDialog
        open={openDropzone}
        onSave={updateProfilePicUrl}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        filesLimit={1}
        maxFileSize={5000000}
        onClose={handleCloseDropZone}
      />

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
              src={context?.user?.picUrl}
            />
            <IconButton onClick={handleOpenDropZone}>
              <PhotoCamera />
            </IconButton>
          </Grid>

          <Grid
            container
            direction='column'
            alignItems='flex-start'
            item
            md={6}
            xs={12}
          >
            <Typography variant='h4'>{context?.user?.userName}</Typography>
            <Typography variant='h5'>{context?.user?.email}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Gallery user={context!.user!} />
        </Grid>
      </Grid>
    </>
  );
};
export default Profile;
