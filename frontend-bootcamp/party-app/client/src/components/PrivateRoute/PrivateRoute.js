import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const privateRoute = ({component: Component, auth, ...rest}) => (

    <Route
        {...rest}
        render = {props => auth.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }    
     />
);

privateRoute.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps)(privateRoute);