import axios from 'axios';
import { browserHistory } from 'react-router-dom';
import history from "../history.js";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

// action creator
export function signinUser({ email, password }) {
    //reduxThunk: at some point in the future call dispatch method
    return function (dispatch) {
        // submit email/password to the server (api-server)
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(
            response => {
                // - Update state to indicate is authenticated
                dispatch({ type: AUTH_USER });
                // - save JWT Token
                localStorage.setItem('token', response.data.token);
                // - redirect to the router '/feature'
                history.push('/feature');
            }).catch(() => {
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password }).then(
            response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/feature');
            })
            .catch(error => {
                console.log(error.response);
                return dispatch(authError(error.response.data.error));
            })
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    // redirect 
    return { type: UNAUTH_USER };
}

// we are passing object instead of arrayy
// so we can use es6: {email: email, password: password}
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}


export function fetchMessage(){
    return function(dispatch){
        axios.get(`${ROOT_URL}`,{
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        });
    }
}

