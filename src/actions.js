/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
export const START_FETCHING = 'START_FETCHING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const REPLACE_USERS_TO_SHOW = 'REPLACE_USERS_TO_SHOW';
export const CHANGE_USERS = 'CHANGE_USERS';
export const REFRESH = 'REFRESH';

export const refresh = () => {
  return {
    type: REFRESH,
  };
};
export const startFetching = () => {
  return {
    type: START_FETCHING,
  };
};
export const changeUsers = (users) => {
  return {
    type: CHANGE_USERS,
    users,
  };
};
export const replaceUsersToShow = (usersToShow) => {
  return {
    type: REPLACE_USERS_TO_SHOW,
    usersToShow,
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
