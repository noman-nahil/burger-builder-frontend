import axios from 'axios';
import * as actionTypes from './actionTypes';
import jwt_decode from "jwt-decode"

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = authLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: authLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}
export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        //returnSecureToken: true,
    }
    let url = "http://localhost:3001"
    let authUrl = "";
    if (mode === "Sign Up") {
        authUrl = `${url}/user`;
    }
    else {
        authUrl = `${url}/user/login`;
    }
    //const API_KEY = "AIzaSyCKO8P9zd-xNuiNKG94pHOfSSilGBJ2udg"
    axios.post(authUrl, authData)
        .then(response => {
            //console.log(response.data);
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            let decoded = jwt_decode(response.data.token)
            const expirationTime = new Date(decoded.exp * 1000);
            localStorage.setItem('expirationTime', expirationTime)
            dispatch(authSuccess(response.data.token, response.data.user._id))
        })
        .catch(err => {
            dispatch(authLoading(false));
            //console.log(err.response.data.error.message)
            dispatch(authFailed(err.response.data))
        })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}
export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        //logout
        dispatch(logout());
    }
    else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            //logout
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
