/* eslint-disable import/no-anonymous-default-export */
import * as types from '../actions/types';

const initialState = {
  events: [],
  loading: false,
  error: null,
}

export default function(state = initialState, action) {
  switch (action.types) {
    case types.GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        events: action.payload,
      };

    case types.GET_EVENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      default:
        return state;
  }
}
