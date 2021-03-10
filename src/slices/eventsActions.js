import { fetchEvents, fetchEventsFailure } from './events';

// Async thunk action
export function apiRequest(url = '', options = {}, actionType = () => {}) {
  return async dispatch => {
    dispatch(fetchEvents());

    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      dispatch(actionType(response));
    })
    .catch(error => {
      dispatch(fetchEventsFailure());
    });
  };
};