import { fetchEvents, fetchEventsFailure } from './events';

// Async thunk action
export function apiRequest(url = '', id = '', options = {}, actionType = () => {}) {
  return async dispatch => {
    dispatch(fetchEvents());

    console.log(actionType)

    fetch(`${url}${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    })
    .then(response => response.json())
    .then(response => {
      dispatch(actionType(response, id));
    })
    .catch(error => {
      dispatch(fetchEventsFailure());
    });
  };
};
