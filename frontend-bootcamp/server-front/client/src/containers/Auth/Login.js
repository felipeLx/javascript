import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Register from '../../components/Register/Register';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
// import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const login = React.memo(props => {
    const [controls, setControls] = useState({
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
          elementType: 'input',
          elementConfig: {
              type: 'password',
              placeholder: 'Password'
          },
          value: '',
          validation: {
              required: true,
              minLength: 6
          },
          valid: false,
          touched: false
      }
    });
   

    const [authenticated, setAuthenticated] = useState(false);


    const inputChangedHandler = ( event, controlName ) => {
      const updatedControls = updateObject( controls, {
          [controlName]: updateObject( controls[controlName], {
              value: event.target.value,
              valid: checkValidity( event.target.value, controls[controlName].validation ),
              touched: true
          } )
      } );
      setControls(updatedControls);
  }

    const submitHandler = (event) => {
        event.preventDefault();
        setAuthenticated(true);
        const userData = { username: controls.email.value, password: controls.password.value};
        props.onAuth( controls.email.value, controls.password.value, authenticated );
        props.loginUser(userData);
    };

    const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        if ( props.loading ) {
            form = <Spinner />
        }

    return (
      <div className="container">
        <div style={{ marginTop: "4rem", paddingTop: "70px" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Voltar a Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> abaixo
              </h4>
              <p className="grey-text text-darken-1">
                Ainda não tem uma conta? <Link to="/auth">Registrar</Link>
              </p>
            </div>
            <form noValidate onSubmit={submitHandler}>
              <div className="input-field col s12">
                {form}
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <Button btnType="Success">SUBMIT</Button>
              </div>
            </form>
          </div>
        </div>
        {authenticated ? <Register /> : null}
      </div>
    );
});

export default login;