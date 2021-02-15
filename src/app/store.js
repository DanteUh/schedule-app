import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import eventData from '../store/reducers/eventData';

export default configureStore({
  reducer: {
    counter: counterReducer,
    eventData,
  },
});
