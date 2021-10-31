import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from "prop-types";

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
// import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = React.memo(props => {
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
        },
        password2: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repita a Password'
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

    const [isSignup, setIsSignup] = useState(true);

    const { authRedirectPath ,onSetAuthRedirectPath } = props;

    useEffect(() => {
        if ( authRedirectPath !== '/login' ) {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath ,onSetAuthRedirectPath]);

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

    const submitHandler = ( event ) => {
        event.preventDefault();
        setIsSignup(!isSignup);
        const newUser = {
            email: controls.email.value,
            password: controls.email.value,
            password2: controls.email.value
          };
        props.onAuth( controls.email.value, controls.password.value, isSignup );
    }

    // const switchAuthModeHandler = () => {
    //     setIsSignup(!isSignup);
    // }

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

        let errorMessage = null;

        if ( props.error ) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        // let authRedirect = null;
        // if ( props.isAuthenticated ) {
        //     authRedirect = <Redirect to={props.authRedirectPath} />
        // }

        return (
            <div className={classes.Auth}>
                <h4>
                    <b>Registrar</b> abaixo
                </h4>
                <p className="grey-text text-darken-1">
                    Já tem uma conta? <Link to="/login">Log in</Link>
                </p>
                {/* {authRedirect} */}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">ENVIAR</Button>
                </form>
                {/* <Button
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button> */}
            </div>
        );
});

export default auth;