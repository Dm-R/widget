/* eslint-disable arrow-body-style */
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const DELETE_ESER = 'DELETE_ESER';

export const delUser = (id) => {
  return {
    type: DELETE_ESER,
    id,
  };
};
export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    users,
  };
};
export const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
};
