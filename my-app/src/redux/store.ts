import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './ducks/employee.duck';
import createSagaMiddleware from 'redux-saga';
import { employeeSaga } from './ducks/employee.duck';

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        employee: employeeReducer
    },
    middleware: [saga]
});

export type RootState = ReturnType<typeof store.getState>;

saga.run(employeeSaga);
