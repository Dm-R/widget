/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
import './scss/main.scss';

import {
  FETCH_USERS,
  fetchUsersSuccess, fetchUsersError,
} from './actions';

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;


const { applyMiddleware } = redux;
const { createStore } = redux;

const initialState = {
  usersState: {
    areFetching: false,
    users: [],
  },
};

const fetchUsers = (url) => async (dispatch) => {
  dispatch(SEND_REQUEST);
  try {
    let users = await fetch(url);
    users = await users.json();
    const usersUrl = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      usersUrl.push(user.url);
    }
    let dividedBy10UsersUrl = [];
    const countParts = Math.floor(usersUrl.length / 10);
    for (let i = 0, j = 1; i <= countParts; i += 1, j += 1) {
      dividedBy10UsersUrl = [...dividedBy10UsersUrl, usersUrl.slice(i * 10, j * 10)];
    }
    let usersWithFullInfo = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const each10Url of dividedBy10UsersUrl) {
      // eslint-disable-next-line max-len
      const next10users = await Promise.all([...(each10Url.map((singleUrl) => fetch(singleUrl)))]);
      usersWithFullInfo = [...usersWithFullInfo, next10users];
    }
    dispatch(fetchUsersSuccess(usersWithFullInfo));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

const store = createStore(reduser, applyMiddleware(thunkMiddleware));
