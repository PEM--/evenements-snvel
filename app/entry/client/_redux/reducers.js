import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import auth from './auth';

export default combineReducers(Object.assign({}, {
  auth, routing
}));
