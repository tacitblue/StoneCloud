import * as APIUtil from '../util/session_api_util';
import { hashHistory } from 'react-router';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: 'RECEIVE_CURRENT_USER',
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: 'RECEIVE_ERRORS',
    errors
  };
};

export const login = (user) => {
  return (dispatch) => {
    return APIUtil.login(user)
      .then(user => dispatch(receiveCurrentUser(user)),
            err => dispatch(receiveErrors(err.responseJSON)));
  };
};

export const loginGuest = () => {
  return (dispatch) => {
    return APIUtil.loginGuest()
      .then(user => dispatch(receiveCurrentUser(user)),
            err => dispatch(receiveErrors(err.responseJSON)));
  };
};

export const logout = () => {
  return (dispatch) => {
    return APIUtil.logout()
      .then(user => {
        dispatch(receiveCurrentUser(null));
        hashHistory.push("/");
      }, err => dispatch(receiveErrors(err.responseJSON)));
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return APIUtil.signup(user)
      .then(user => dispatch(receiveCurrentUser(user)),
            err => dispatch(receiveErrors(err.responseJSON)));
  };
};
