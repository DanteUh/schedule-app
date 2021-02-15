import { combineReducers } from 'redux';
import eventData from '../reducers/eventData';

const appReducer = combineReducers({
  eventData,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;