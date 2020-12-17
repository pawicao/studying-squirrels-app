import * as actionTypes from '../actions/actionTypes';

const initialState = {
  studentMode: true,
};

const changeMode = (state) => {
  let prevState = {...state};
  return {
    studentMode: !prevState.studentMode,
  };
};

const setMode = (state, action) => ({studentMode: action.studentMode});

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.MODE_CHANGE) {
    return changeMode(state);
  }
  if (action.type === actionTypes.MODE_SET) {
    return setMode(state, action);
  }
  return state;
};

export default reducer;
