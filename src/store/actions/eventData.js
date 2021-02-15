import * as types from './types';
import * as helpers from './helpers';
import * as events from '../../app-data/events.json';

export const getEventData = () => {
  return dispatch => {
    const eventData = events.data;
    
    if (eventData) {
      console.log(eventData)
      dispatch({
        type: types.GET_EVENTS_SUCCESS,
        payload: eventData
      });
      return eventData;
    } else {
      dispatch(helpers.requestFailed(types.GET_EVENTS_FAILED, eventData));
    }
  }
}
