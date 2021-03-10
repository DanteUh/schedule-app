import { combineReducers } from 'redux';
import eventsReducer from './events';

const appReducer = combineReducers({
  eventsReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;