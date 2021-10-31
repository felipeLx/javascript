import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import Users from './components/Users/Users';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import * as actions from './store/actions/index';

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
        <Route path="/services" render={props => <Services {...props} />} />
        <Route path="/places" render={props => <Places {...props} />} />
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


export default withRouter(app);

