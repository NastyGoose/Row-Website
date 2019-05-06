import actionHandler from '../../actions/actionHandler';
import { SHOW_PANEL } from '../../actions/panelStateAction';

describe('Request Reducer', () => {
  it('has a default state', () => {
    expect(actionHandler(undefined, { type: 'unexpected' })).toEqual({
      isOpen: false,
      showSidebar: false,
      showPanel: false
    });
  });

  it('can handle SHOW_PANEL type', () => {
    expect(actionHandler(undefined,
      {
        type: SHOW_PANEL,
        payload: true
      })).toEqual({
      isOpen: false,
      showSidebar: false,
      showPanel: true
    });
  });
});
