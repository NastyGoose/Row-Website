export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';

export const changeState = (show) => dispatch => {
  dispatch({
    type: 'SHOW_SIDEBAR',
    payload: show
  });
};
