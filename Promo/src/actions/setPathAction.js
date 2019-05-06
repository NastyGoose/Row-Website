export const SET_PATH = 'SET_PATH';

export const setPath = (path) => dispatch => {
  console.log('setPath called');
  dispatch({
    type: 'SET_PATH',
    payload: path
  });
};
