import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employee/employeeSlice';
import createSagaMiddleware from 'redux-saga';
import employeeSaga from './employee/employeeSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        employee: employeeReducer
    },
    middleware: [saga]
});

export type RootState = ReturnType<typeof store.getState>;

saga.run(employeeSaga);
