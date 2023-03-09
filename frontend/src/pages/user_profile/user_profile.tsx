import { useParams } from 'react-router-dom';
import Gallery from '../../components/gallery/gallery';
import graphqlRequestClient from '../../graphQLRequestClient';
import { useGetUserQuery } from '../../generated/graphql';
import IUser from '../../interfaces/user_interface';
import styles from './style.module.scss';
import {
  mobileBreakpoint,
  useWindowDimensions,
} from '../../utils/use_window_dimensions';
import UserNameEmail from '../../components/user_name_email';
import LoadingScreen from '../../components/loading_screen';

const UserProfile = () => {
  const { width } = useWindowDimensions();

  const { email }: any = useParams();
  const { isLoading, data, isError, error } = useGetUserQuery(
    graphqlRequestClient,
    {
      email,
    }
  );

  const user = data?.getUser;

  if (isError) {
    console.log(error);
    return <h4>Error</h4>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <img
        className={`${styles.user_profile} justify_self_center circular_border`}
        src={user?.picUrl || ''}
        alt='User Profile Pic'
      />
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
        <Gallery user={user as IUser} />
      </div>
    </div>
  );
};
export default UserProfile;
