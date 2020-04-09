/* eslint-disable linebreak-style */
import 'babel-polyfill';
import mustache from 'mustache';
import './scss/main.scss';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from './reducers';
import {
  fetchUsersSuccess, fetchUsersError, replaceUsersToShow,
  startFetching, changeUsers, refresh,
} from './actions';

const loggerMiddleware = createLogger();

const initialState = {
  requestUsers: {
    isFetching: false,
    errorMessage: '',
    users: [],
    refresh: false,
  },
  usersToShow: [],
};

const reducer = combineReducers({
  ...reducers,
});

const store = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)(reducer, initialState);

const tmp = document.querySelector('#tmp').innerHTML;

const url = 'https://api.github.com/users';

// параметры для запроса пользователей
const param = {
  since: 0,
  page: 1,
  per_page: 5,
};

// Количество карточек
const countCards = 3;

// Функция для добавления параметров к url
const makeUrl = (urlAdress, paramObject) => {
  let fullUrl = urlAdress;
  if (paramObject && paramObject instanceof Object) {
    const paramObj = paramObject;
    paramObj.since = Math.floor(Math.random() * 999999);
    fullUrl += Object.entries(paramObj).reduce((acc, [key, value]) => {
      return acc += `&${key}=${value}`;
    }, '');
    fullUrl = fullUrl.replace(/&/, '?');
  }
  return fullUrl;
};

// Функция для установки отображаемых пользователей
const setUsersToShow = (count) => (dispatch, getState) => {
  const state = getState();
  let { users } = state.requestUsers;
  const usersToShow = [];
  let index = 0;
  if (users.length) {
    for (let i = 0; i < count; i += 1) {
      index = Math.floor(Math.random() * users.length);
      usersToShow.push(users[index]);
      users = users.filter((user, ind) => ind !== index);
    }
  }
  dispatch(replaceUsersToShow(usersToShow));
  return dispatch(changeUsers(users));
};

// Функция для запроса новых пользователей
const fetchUsers = (fullUrl) => async (dispatch) => {
  dispatch(startFetching());
  try {
    let users = await fetch(fullUrl);
    users = await users.json();
    users = await Promise.all(users.map((user) => fetch(user.url)));
    users = await Promise.all(users.map((user) => user.json()));
    return dispatch(fetchUsersSuccess(users));
  } catch (error) {
    return dispatch(fetchUsersError(error));
  }
};

// Функция для изменения отображаемых пользователей
const changeUsersToShow = (oldUsersToShow, userToAdd, userToChange) => {
  const newUsersToShow = oldUsersToShow.map((user) => {
    if (user === userToChange) {
      return userToAdd;
    }
    return user;
  });
  return newUsersToShow;
};

// Функция для замены пользователя
const changeUser = (userToChange, fullUrl) => async (dispatch, getState) => {
  const state = getState();
  let { users } = state.requestUsers;
  let { usersToShow } = state;
  let index = 0;
  let newUser = null;
  if (users.length) {
    index = Math.floor(Math.random() * users.length);
    newUser = users[index];
    users = users.filter((user, ind) => ind !== index);
    dispatch(changeUsers(users));
    usersToShow = changeUsersToShow(usersToShow, newUser, userToChange);
    return dispatch(replaceUsersToShow(usersToShow));
  }
  usersToShow = changeUsersToShow(usersToShow, newUser, userToChange);
  dispatch(replaceUsersToShow(usersToShow));
  await dispatch(fetchUsers(fullUrl));
  if (!state.requestUsers.errorMessage) {
    return dispatch(changeUser(null, fullUrl));
  }
  return dispatch(replaceUsersToShow(usersToShow));
};

// Функция для отображения данных на странице
const render = () => {
  const content = document.querySelector('.content');
  content.innerHTML = '';
  const state = store.getState();
  const { requestUsers } = state;
  const refreshSpin = document.querySelector('.footer i');
  if (requestUsers.refresh) {
    refreshSpin.classList.add('fa-spin');
  } else {
    refreshSpin.classList.remove('fa-spin');
  }
  if (requestUsers.isFetching && !state.usersToShow.length) {
    const container = document.createElement('div');
    container.className = 'fetching';
    const spinnerWrap = document.createElement('div');
    spinnerWrap.className = 'spinner-wrapper';
    spinnerWrap.innerHTML = '<i class="fa fa-spinner fa-spin fa-pulse fa-5x" aria-hidden="true"></i>';
    container.appendChild(spinnerWrap);
    content.appendChild(container);
  } else if (requestUsers.errorMessage && !state.usersToShow.length) {
    const error = document.createElement('div');
    error.className = 'error';
    error.innerText = requestUsers.errorMessage;
    content.appendChild(error);
  } else {
    state.usersToShow.forEach((user) => {
      const card = document.createElement('div');
      if (user === null && requestUsers.errorMessage) {
        card.className = 'card';
        card.innerHTML = requestUsers.errorMessage;
      } else if (user === null) {
        card.className = 'waiting';
        card.innerHTML = '<i class="fa fa-spinner fa-spin fa-pulse" aria-hidden="true"></i>';
      } else {
        card.innerHTML = mustache.render(tmp, user);
        const delBtn = card.querySelector('button');
        delBtn.addEventListener('click', () => {
          store.dispatch(changeUser(user, makeUrl(url, param)));
        });
        const arrow = card.querySelector('.arrow');
        arrow.addEventListener('mouseenter', () => {
          delBtn.scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
          });
        });
        card.addEventListener('mouseleave', () => {
          card.querySelector('.card_info').scrollIntoView();
        });
      }
      content.appendChild(card);
    });
  }
};

store.subscribe(render);

window.onload = async () => {
  store.dispatch({ type: 'init' });
  await store.dispatch(fetchUsers(makeUrl(url, param)));
  store.dispatch(setUsersToShow(countCards));
};

const refreshBtn = document.querySelector('.footer button');
refreshBtn.addEventListener('click', async () => {
  store.dispatch(refresh());
  await store.dispatch(fetchUsers(makeUrl(url, param)));
  store.dispatch(setUsersToShow(countCards));
});
