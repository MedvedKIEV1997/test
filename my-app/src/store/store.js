import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employee/employeeSlice';
import createSagaMiddleware from 'redux-saga';
import employeeSaga from './employee/employeeSaga';

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: [saga],
});

saga.run(employeeSaga);
