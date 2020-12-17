import * as actionTypes from './actionTypes';

export const changeMode = () => (dispatch) => {
  dispatch({
    type: actionTypes.MODE_CHANGE,
  });
};

export const setMode = (studentMode) => (dispatch) => {
  dispatch({
    type: actionTypes.MODE_SET,
    studentMode,
  });
};
