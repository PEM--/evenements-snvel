import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import auth from './auth';

export default combineReducers({
  auth,
  routing
});
