import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { demoReducer } from './reducers/demo-reducer';
const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer:{
  demoReducer,
},middleware : [thunkMiddleware,loggerMiddleware]})