/* eslint-disable linebreak-style */
import {
  START_FETCHING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR,
  CHANGE_USERS, REPLACE_USERS_TO_SHOW, REFRESH,
} from './actions';

export const requestUsers = (state = {}, action) => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isFetching: true,
        users: [],
      };
    case FETCH_USERS_ERROR:
      return {
        isFetching: false,
        errorMessage: action.error,
        users: [],
        refresh: false,
      };
    case FETCH_USERS_SUCCESS:
      return {
        isFetching: false,
        errorMessage: '',
        users: action.users,
        refresh: false,
      };
    case CHANGE_USERS:
      return {
        ...state,
        users: action.users,
      };
    case REFRESH:
      return {
        ...state,
        refresh: true,
      }
    default:
      return state;
  }
};

export const usersToShow = (state = [], action) => {
  return action.type === REPLACE_USERS_TO_SHOW ? action.usersToShow : state;
}
