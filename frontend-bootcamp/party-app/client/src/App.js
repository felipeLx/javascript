import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
// import { setCurrentUser, logoutUser } from "./store/actions/authAction";
import Users from './components/Users/Users';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import * as actions from './store/actions/index';
// import store from "./store";

const Auth = React.lazy(() => {
  return import ('./containers/Auth/Auth');
});

const Login = React.lazy(() => {
  return import ('./containers/Auth/Login');
});

const Register = React.lazy(() => {
  return import ('./components/Register/Register');
});

const User = React.lazy(() => {
  return import ('./components/Users/User/User');
});

const AboutUs = React.lazy(() => {
  return import ('./components/AboutUs/AboutUs');
});

const Services = React.lazy(() => {
  return import ('./components/Services/Services');
});

const Places = React.lazy(() => {
  return import ('./components/Places/Places');
});

// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   // store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     // store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }
const app = React.memo(props => {
  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = null;
  if(!props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/about" render={props => <AboutUs {...props} />} />
        <Route path="/:id" render={props => <User {...props} />} />
        <Route path="/" exact render={props => <Users {...props} />} />
        <Redirect to="/" />
      </Switch> 
    );
  }

  if(props.isAuthenticated) {
    routes = (
      <Switch>
        <PrivateRoute exact path="/register/:id" component={Register} />
        <Route path="/logout" render={props => <Logout {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/" exact render={props => <Users {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading ...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    hasId: state.auth.userId
  };
};


const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (app));

