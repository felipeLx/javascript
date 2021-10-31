import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import registerServiceWorker from './registerServiceWorker';
// import authReducer from './store/reducers/auth'; 
// import errorReducer from './store/reducers/errorReducer'; 
// import { watchAuth } from './store/sagas';

// import jwt_decode from "jwt-decode";
// import setAuthToken from "./shared/setAuthToken";
// import { setCurrentUser, logoutUser } from "./store/actions/auth";

import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// const rootReducer = combineReducers({
//   auth: authReducer,
  
// });

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk, sagaMiddleware)
// ));

// sagaMiddleware.run(watchAuth);

// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   // setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }

const app = (
  //store={store}
  // <Provider> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

registerServiceWorker();