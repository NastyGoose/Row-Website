import { combineReducers } from 'redux';
import projectsReducer from './projects';
import actionHandler from '../actions/actionHandler';

const allReducers = combineReducers({
  projects: projectsReducer,
  actions: actionHandler
});

export default allReducers;
