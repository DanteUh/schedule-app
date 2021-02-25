import * as types from './types';
import * as helpers from './helpers';

export const apiRequest = (url='', options={}, actionType = '') => {
  return dispatch => {
    dispatch(helpers.requestFailed(types.FETCH_EVENTS_REQUEST));

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...options
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      response.json();
    })
    .then(response => {
      console.log(response)
      dispatch(helpers.requestSuccess(actionType))
    })
    .catch(error => {
      dispatch(helpers.requestFailed(types.FETCH_EVENTS_FAILED));
    });
  };
};
