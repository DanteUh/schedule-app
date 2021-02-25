/* eslint-disable import/no-anonymous-default-export */
import * as types from '../actions/types';

const initialState = {
  events: [],
  loading: false,
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.FETCH_EVENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case types.GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        events: action.payload,
      };

      default:
        return state;
    
      case types.POST_EVENT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          events: [...state.events, action.payload],
        }
  }
}
