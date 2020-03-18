import {
  SEND_REQUEST,
  addRequestSuccess, addRequestError 
} from './actions';

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;


const { applyMiddleware } = redux;
const { createStore } = redux;


const State = {
  count: 0,
};
const fetchUsers = (url) => {
  return async (dispatch) => {
    dispatch(SEND_REQUEST);
    let users = await fetch(url);
    users = await users.json();
    const usersUrl = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      usersUrl.push(user.url);
    }
    const dividedBy10UsersUrl = [];
    const countParts = Math.floor(usersUrl.length/10);
    for (let i = 0, j = 1; i <= countParts; i += 1, j += 1) {
      dividedUsersUrl = [...dividedUsersUrl, usersUrl.slice(i * 10, j * 10)]
    }
    const usersWithFullInfo = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const each10Url of dividedUsersUrl) {
      const users = await Promise.all([...each10Url]);
    }
  };
};
const reduser = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const store = createStore(reduser, applyMiddleware(thunkMiddleware));
