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
  }
});

// Actions to dispatch (instead of action types)
export const { fetchEvents, getEventsSuccess, fetchEventsFailure } = eventsSlice.actions;

// Selector
export const eventsSelector = state => state.events;

// Reducer
export default eventsSlice.reducer;
