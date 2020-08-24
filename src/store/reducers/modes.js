import * as actionTypes from '../actions/actionTypes';

const initialState = {
  studentMode: true,
};

const changeMode = state => {
  let prevState = {...state}
  return {
    studentMode: !prevState.studentMode
  }
}

const reducer = (state = initialState, action) => {
  if(action.type === actionTypes.MODE_CHANGE) {
    return changeMode(state);
  }
  return state;
};

export default reducer;
