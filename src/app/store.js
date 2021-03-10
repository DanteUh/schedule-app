import { configureStore } from '@reduxjs/toolkit';

import eventsReducer from '../slices/events';

const reducer = {
  events: eventsReducer,
}

export default configureStore({
  reducer,
});
