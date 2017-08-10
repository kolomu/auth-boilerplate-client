import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import history from "./history";
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);


// Creat store first, then check if token exists, then redirect
// to appropriate URL {Update APP before it is being rendered!}
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if we have a token, consider the user to be signed in
if(token){
  // we need to update application state
  store.dispatch({ type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
      <Switch>
        <Route path="/feature" component={RequireAuth(Feature)} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/" component={App}/>
      </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));
