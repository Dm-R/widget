import {
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, DELETE_ESER,
} from './actions';

const usersState = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        isFetching: false,
        users: action.users,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case FETCH_USERS:
      return {
        isFetching: true,
        users: [],
      };
    case DELETE_ESER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
};
