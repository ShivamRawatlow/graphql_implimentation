import { useContext } from 'react';
import UserContext from '../context/user_context';
import { Route, Redirect } from 'react-router-dom';
import routeNames from '../utils/routeNames';

const MyProfileRoute = ({ component: Component, ...rest }: any) => {
  const context = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        context?.user &&
        props.match.params.userId &&
        context?.user?.id === props.match.params.userId ? (
          <Redirect to={routeNames.myprofile} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default MyProfileRoute;
