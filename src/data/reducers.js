import { combineReducers } from 'redux';

import {
  reducer as dashboardReducer,
  storeName as dashboardStoreName,
} from '../dashboard';

const createRootReducer = () => combineReducers({
  [dashboardStoreName]: dashboardReducer,
});
export default createRootReducer;