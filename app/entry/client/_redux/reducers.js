import { combineReducers } from 'redux';
import { syncHistory, routeReducer as routing } from 'react-router-redux';
import auth from './auth';

export default combineReducers({
  auth, routing
});
