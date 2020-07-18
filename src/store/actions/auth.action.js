import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.LOGOUT
    };
}

export const auth = (email, password, passwordCheck, isSignUp) => {
    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password           
        };
        let url = 'http://localhost:5000/api/users/login';
        if (!isSignUp) {
            url = 'http://localhost:5000/api/users/register';
            authData.passwordCheck = passwordCheck
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    dispatch(authSuccess(response.data.token));
                }, 5000)
               
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            })

    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    }
}
