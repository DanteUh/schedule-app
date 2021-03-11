/* eslint-disable import/no-anonymous-default-export */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  loading: false,
  hasErrors: false,
}

// A slice containing reducers
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEvents: state => {
      state.loading = true
    },
    fetchEventsFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    getEventsSuccess: (state, { payload }) => {
      state.events = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    deleteEventSuccess: state => {
      /* 
        Delete item removed from the state.
        When we get events we set the whole payload to events.
        Now we want to delete item from payload from the old event state.
      */
      console.log(state)
      //state.events = state.events.filter(event => event.id !== payload.id);
      state.loading = false;
      state.hasErrors = false;
    }
  }
});

// Actions to dispatch (instead of action types)
export const { fetchEvents, fetchEventsFailure, getEventsSuccess, deleteEventSuccess } = eventsSlice.actions;

// Selector
export const eventsSelector = state => state.events;

// Reducer
export default eventsSlice.reducer;
