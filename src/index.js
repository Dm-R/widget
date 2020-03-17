const Redux = require('redux');

const State = {
  count: 0,
};
const reduser = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const store = Redux.createStore(reduser, State);
