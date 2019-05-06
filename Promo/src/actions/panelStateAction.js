export const SHOW_PANEL = 'SHOW_PANEL';

export const changeState = (show) => dispatch => {
  dispatch({
    type: 'SHOW_PANEL',
    payload: show
  });
};
