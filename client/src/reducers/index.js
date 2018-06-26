import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  user: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
