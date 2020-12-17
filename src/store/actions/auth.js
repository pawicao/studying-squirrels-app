import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_BASEURL} from '../../env/env';
import moment from 'moment';
import {sendPhoto} from '../../utilities/api';
import {
  getStudentMode,
  removeAuthData,
  setAuthData,
  setStudentMode,
} from '../../utilities/storage';
import {setMode} from './modes';
const queryString = require('query-string');

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccessPlain = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

const authSuccess = (token, userId) => (dispatch) => {
  setAuthData(token, userId)
    .then((_res) => console.log('Data saved in storage'))
    .catch((err) => {
      console.log(err);
    });
  getStudentMode(userId)
    .then((res) => {
      if (res != null) {
        setMode(res);
        dispatch(authSuccessPlain(token, userId));
      } else {
        axios
          .get(`/person/status/${userId}`, {
            headers: {Authorization: `Bearer ${token}`},
          })
          .then((res2) => {
            setMode(res2.data.student);
            setStudentMode(userId, res2.data.student).then(
              (_res) => 'Mode changed in local storage.',
            );
            dispatch(authSuccessPlain(token, userId));
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch(authSuccessPlain(token, userId));
    });
};

const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

const authLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const logout = () => (dispatch) => {
  delete axios.defaults.headers.common.Authorization;
  removeAuthData().then((_r) =>
    console.log('Auth data removed from the local storage'),
  );
  dispatch(authLogout());
};

export const loadFromStorage = (authData) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
  dispatch({
    type: actionTypes.AUTH_SUCCESS,
    token: authData.token,
    userId: authData.userId,
  });
};

export const register = (data, photo) => (dispatch) => {
  dispatch(authStart());
  const registerData = {
    ...data,
    dateOfBirth:
      moment(data.dateOfBirth, 'DD/MM/YYYY').add(2, 'hours').format('X') * 1000,
  };
  const url = `${AUTH_BASEURL}/register`;
  axios
    .post(url, queryString.stringify(registerData), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((res) => {
      const {jwtToken, userId} = res.data;
      axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
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
  const url = `${AUTH_BASEURL}/authenticate`;
  axios
    .post(url, queryString.stringify(authData), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((res) => {
      const {jwtToken, userId} = res.data;
      axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
      dispatch(authSuccess(jwtToken, userId));
    })
    .catch((err) => {
      console.log('No prosze!');
      console.log(err);
      dispatch(authFail(err));
    });
};
