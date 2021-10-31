import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
// import { registerUser } from "../../store/actions/authAction";
import Register from '../../components/Register/Register';

const login = React.memo(props => {
    const [user, setUser] = useState({
            username: '',
            password: '',
            errors: {}
    });

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      // console.log(nextProps);
      console.log(props);
      
      if (props.auth.userId) {
        props.history.push("/");
      }
      if (props.auth.errors) {
        setUser({
          errors: props.auth.errors
        });
      }

    }, [])

    const inputChangedHandler = (event) => {
        setUser({ [event.target.id]: event.target.value});
    };

    const submitHandler = (event) => {
      console.log(props);
        event.preventDefault();
        setAuthenticated(true);
        const userData = { username: user.username, password: user.password};
        props.auth.userId(userData);
    };

    return (
      <div className="container">
        <div style={{ marginTop: "4rem", paddingTop: "70px" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Ainda não tem uma conta? <Link to="/auth">Registrar</Link>
              </p>
            </div>
            <form action="/login" method="POST" noValidate onSubmit={submitHandler}>  
            
              <div className="input-field col s12">
                <input
                  onChange={inputChangedHandler}
                  value={user.email}
                  error={user.errors}
                  id="email"
                  type="email"
                  name="email"

                  
                />
                <label htmlFor="email">Email</label>
                
              </div>
              <div className="input-field col s12">
                <input
                  onChange={inputChangedHandler}
                  value={user.password}
                  error={user.errors}
                  id="password"
                  type="password"
                  name="password"
                 
                />
                <label htmlFor="password">Password</label>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        {authenticated ? <Register /> : null}
      </div>
    );
});

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(login);