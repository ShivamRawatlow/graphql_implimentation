import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import MyProfile from '../pages/my_profile/my_profile';
import Login from '../pages/registration/login';
import Register from '../pages/registration/register';
import RegistrationComponent from '../pages/registration/registration_component';
import UserProfile from '../pages/user_profile/user_profile';
import routeNames from '../utils/routeNames';
import CreatePost from './create_post';
import MyProfileRoute from './myprofileroute';

const Routing = () => {
  return (
    <Routes>
      <Route
        path={routeNames.login}
        element={
          <RegistrationComponent
            Component={Login}
            route={routeNames.register}
            message={'Dont have an account?'}
          />
        }
      />
      <Route
        path={routeNames.register}
        element={
          <RegistrationComponent
            Component={Register}
            route={routeNames.login}
            message={'Already have an account?'}
          />
        }
      />
      <Route path={routeNames.home} element={<Home />} />
      <Route path={routeNames.createPost} element={<CreatePost />} />
      <Route path={routeNames.myprofile} element={<MyProfile />} />
      <Route
        path={routeNames.userprofile}
        element={
          <MyProfileRoute>
            <UserProfile />
          </MyProfileRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
