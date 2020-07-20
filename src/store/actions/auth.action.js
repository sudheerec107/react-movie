import * as actionTypes from './actionTypes';
import instanceAxios from '../../axios';

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
        let url = '/users/login';
        if (!isSignUp) {
            url = '/users/register';
            authData.passwordCheck = passwordCheck
        }
        instanceAxios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch(authSuccess(response.data.token));

            })
            .catch(err => {
                dispatch(authFail(err.response ? err.response.data: err));
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
