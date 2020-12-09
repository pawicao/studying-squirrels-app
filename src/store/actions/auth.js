import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_BASEURL, API_BASEURL} from '@env';
import moment from 'moment';
import Api, {sendPhoto} from '../../utilities/api';
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

const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const logout = () => (dispatch) => {
  delete axios.defaults.headers.common.Authorization;
  dispatch(authLogout());
};

export const register = (data, photo) => (dispatch) => {
  dispatch(authStart());
  const registerData = {
    ...data,
    dateOfBirth:
      moment(data.dateOfBirth, 'DD/MM/YYYY').add(2, 'hours').format('X') * 1000,
  };
  axios
    .post(`${AUTH_BASEURL}/register`, queryString.stringify(registerData), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((res) => {
      const {jwtToken, userId} = res.data;
      axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
      /*      Api.interceptors.request.use(
        (request) => {
          request.headers.Authorization = `Bearer ${jwtToken}`;
          return request;
        },
        (error) => Promise.reject(error),
      );*/
      if (photo) {
        sendPhoto(
          photo,
          userId,
          jwtToken,
          () => dispatch(authSuccess(jwtToken, userId)),
          true,
        );
      } else {
        dispatch(authSuccess(jwtToken, userId));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
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
      axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
      /*      Api.interceptors.request.use(
        (request) => {
          request.headers.Authorization = `Bearer ${jwtToken}`;
          return request;
        },
        (error) => Promise.reject(error),
      );*/
      dispatch(authSuccess(jwtToken, userId));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
