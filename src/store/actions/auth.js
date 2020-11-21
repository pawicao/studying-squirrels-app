import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_BASEURL} from '@env';
import Api from '../../utilities/api';
const queryString = require('query-string');

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const logout = () => (dispatch) => {
  delete Api.defaults.headers.common.Authorization;
  dispatch(authLogout());
};

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {email, password};
  axios
    .post(`${AUTH_BASEURL}/authenticate`, queryString.stringify(authData), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((res) => {
      const {jwtToken, userId} = res.data;
      Api.interceptors.request.use(
        (request) => {
          request.headers.Authorization = `Bearer ${jwtToken}`;
          return request;
        },
        (error) => Promise.reject(error),
      );
      dispatch(authSuccess(jwtToken, userId));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
