export const SEND_REQUEST = 'SEND_REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SECCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const addRequestSuccess = (response) => {
  return {
    type: REQUEST_SUCCESS,
    response,
  };
};
export const addRequestError = (error) => {
  return {
    type: REQUEST_ERROR,
    error,
  };
};
