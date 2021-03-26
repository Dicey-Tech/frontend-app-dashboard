import { combineReducers } from 'redux';
import teaching from './teaching';
import classData from './classData';

export default combineReducers(
  {
    teaching,
    classData,
  },
);
