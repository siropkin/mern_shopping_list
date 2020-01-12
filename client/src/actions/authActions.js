import axios from 'axios';
import { returnErrors } from './errorsActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING});

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnErrors(data, status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const { token } = getState().auth;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
