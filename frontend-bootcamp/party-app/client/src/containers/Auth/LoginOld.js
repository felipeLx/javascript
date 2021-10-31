import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import api from '../../api/index';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = React.memo(props => {
    const [controls, setControls] = useState({
            
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'username',
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
                    name: 'password',
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

    const [isSignup, setIsSignup] = useState(false);

    const { authRedirectPath ,onSetAuthRedirectPath } = props;

    useEffect(() => {
        if ( authRedirectPath !== `/` ) {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath ,onSetAuthRedirectPath]);

    const inputChangedHandler = ( event, controlName ) => {
        event.preventDefault();
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
            } )
        } );
        setControls(updatedControls);
    };

    const authCustomer = () => {
        setIsSignup(!isSignup);
        let data = { username: controls.email.value, password: controls.password.value};
        
            api.loginUser('/login', data)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onAuth( controls.email.value, controls.password.value, isSignup );
    };

    // const switchAuthModeHandler = () => {
    //     setIsSignup(!isSignup);
    // };

        const formElementsArray = [];
        for ( let key in controls ) {
            formElementsArray.push( {
                id: key,
                config: controls[key]
            } );
        };

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                name={formElement.config.elementConfig.name}
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

        let authRedirect = null;
        if ( props.isAuthenticated ) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                
                <hr row="3"></hr>
                <form action="/login" method="POST" onSubmit={submitHandler}>
                    {form}
                    <Button type="submit" btnType="Success" clicked={() => authCustomer()}>ENTRAR</Button>
                </form>
                <br></br>
                {/* <Button
                    clicked={switchAuthModeHandler}
                    btnType="Danger"> {isSignup ? 'ENTRAR' : 'REGISTRAR'}</Button> */}
            </div>
        );
});

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( `/` ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( auth );