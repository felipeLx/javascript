import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = React.memo(() => {
    const [isAuth, setIsAuth] = useState(false);

    const signUpHandler = () => {
        setIsAuth(!isAuth);
        return <Redirect to="/" />
    };

    return(
        <div className={classes.Auth}>
            <div className="container mt-5">
                <div class="row">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <form action="/auth" method="POST">
                                    <div className="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" className="form-control" name="username" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" className="form-control" name="password" />
                                    </div>
                                    <button onClick={signUpHandler} type="submit" className="btn btn-dark">Registro</button>
                                </form>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-sm-4">
                        <div className="card social-block">
                            <div className="card-body">
                                <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                    <i className="fab fa-google"></i>
                                    Sign Up with Google
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
});

export default auth;