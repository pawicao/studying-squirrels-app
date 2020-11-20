import * as actionTypes from './actionTypes';
import axios from 'axios';

const mockAuthApi = 'https://5f37bdd6bbfd1e00160bf569.mockapi.io/test-api/auth';

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

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {email, password};
  const url = mockAuthApi;
  axios
    .post(url, authData)
    .then((res) => {
      const {token, userId} = res.data;
      dispatch(authSuccess(token, userId));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
