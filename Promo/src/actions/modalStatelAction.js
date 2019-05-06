export const IS_OPEN = 'IS_OPEN';

export const changeState = (text) => dispatch => {
  dispatch({
    type: 'IS_OPEN',
    payload: text
  });
};
