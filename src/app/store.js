import { configureStore } from '@reduxjs/toolkit';
import eventData from '../store/reducers/eventData';

export default configureStore({
  reducer: {
    eventData,
  },
});
