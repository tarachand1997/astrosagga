import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import loginReducer from './reducer/loginReducer'
import adminReducer from './reducer/adminReducer'
import * as types from './types';

const appReducer = combineReducers ({
   login: loginReducer,
   admin: adminReducer
});

const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = initialState
  }
  return appReducer(state, action)
}

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;
