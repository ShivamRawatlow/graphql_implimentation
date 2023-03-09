import { useState, useContext } from 'react';
import uploadPic from '../../utils/upload_pic';
import { IconButton } from '@mui/material';
import UserContext from '../../context/user_context';
import Gallery from '../../components/gallery/gallery';
import { PhotoCamera } from '@mui/icons-material';
import FileSelector from '../../components/file_selector/file_selector';
import { useUpdateProfilePicMutation } from '../../generated/graphql';
import graphqlRequestClient from '../../graphQLRequestClient';
import styles from './style.module.scss';
import {
  mobileBreakpoint,
  useWindowDimensions,
} from '../../utils/use_window_dimensions';
import UserNameEmail from '../../components/user_name_email';
import IUser from '../../interfaces/user_interface';
import { useAuthentication } from '../../utils/use_authentication';
import { useMutation } from '@tanstack/react-query';
import LoadingScreen from '../../components/loading_screen';

const MyProfile = () => {
  const { width } = useWindowDimensions();
  const { mutate: updatePicMutation, isLoading: isUpdatingPicture } =
    useMutation(updateProfilePicUrl);
  const context = useContext(UserContext);
  const user = context?.user;
  const [openDropzone, setOpenDropZone] = useState(false);
  const authentication = useAuthentication();
  const { mutate, isLoading } = useUpdateProfilePicMutation(
    graphqlRequestClient,
    {
      onSuccess(data) {
        const updatedUser = { ...context?.user };
        updatedUser.id = data.updateProfilePic.id;
        updatedUser.picUrl = data.updateProfilePic.picUrl;
        updatedUser.token = data.updateProfilePic.token || undefined;
        context?.login(updatedUser);
      },
      onError(err) {
        console.log('Update Profile mutation error', err);
      },
    }
  );

  async function updateProfilePicUrl(pic: File) {
    try {
      const picUrl = await uploadPic(pic);
      authentication.checkAuthentication(() => mutate({ picUrl }));
    } catch (err) {
      context?.setAlert({
        message: 'Unable to upload pic',
        severity: 'error',
      });
    }
  }

  const callback = async (pic: File) => {
    authentication.checkAuthentication(() => updatePicMutation(pic));
  };

  return (
    <>
      {(isUpdatingPicture || isLoading) && <LoadingScreen />}
      <FileSelector
        openDropzone={openDropzone}
        setOpenDropZone={setOpenDropZone}
        uploadFunction={callback}
        isProfile={true}
      />
      <div className={styles.container}>
        <div className='justify_self_center'>
          <img
            className={`${styles.user_profile} circular_border`}
            alt='Profile Pic'
            src={user?.picUrl}
          />
          <IconButton onClick={() => setOpenDropZone(true)}>
            <PhotoCamera />
          </IconButton>
        </div>

        <div
          className={`${styles.user_details_container}  ${
            width <= mobileBreakpoint
              ? 'justify_self_center'
              : 'align_self_center'
          }`}
        >
          <UserNameEmail user={user as IUser} />
        </div>

        <div className={width > mobileBreakpoint ? 'grid_col_span_2' : ''}>
          <Gallery user={context!.user!} />
        </div>
      </div>
    </>
  );
};
export default MyProfile;
