import { Route, Routes } from 'react-router-dom';
import Login from '../pages/registration/login';
import Register from '../pages/registration/register';
import routeNames from '../utils/routeNames';
import { Suspense, lazy } from 'react';
import LoadingScreen from './loading_screen';

const UserProfile = lazy(() => import('../pages/user_profile/user_profile'));
const RegistrationComponent = lazy(
  () => import('../pages/registration/registration_component')
);
const MyProfile = lazy(() => import('../pages/my_profile/my_profile'));
const Home = lazy(() => import('../pages/home'));
const CreatePost = lazy(() => import('./create_post'));
const MyProfileRoute = lazy(() => import('./myprofileroute'));

const Routing = () => {
  return (
    <Routes>
      <Route
        path={routeNames.login}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <RegistrationComponent
              Component={Login}
              route={routeNames.register}
              message={'Dont have an account?'}
            />
          </Suspense>
        }
      />
      <Route
        path={routeNames.register}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <RegistrationComponent
              Component={Register}
              route={routeNames.login}
              message={'Already have an account?'}
            />
          </Suspense>
        }
      />
      <Route
        path={routeNames.home}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path={routeNames.createPost}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <CreatePost />
          </Suspense>
        }
      />
      <Route
        path={routeNames.myprofile}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <MyProfile />
          </Suspense>
        }
      />
      <Route
        path={routeNames.userprofile}
        element={
          <Suspense fallback={<LoadingScreen />}>
            <MyProfileRoute>
              <UserProfile />
            </MyProfileRoute>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
