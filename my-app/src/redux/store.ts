import {
    combineReducers,
    configureStore,
    PreloadedState
} from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';

import employeeReducer from './ducks/employee.duck';
import { employeeSaga, employeeEpic } from './ducks/employee.duck';

const saga = createSagaMiddleware();
const epic = createEpicMiddleware();

const rootEpic = combineEpics(employeeEpic);

const rootReducer = combineReducers({
    employee: employeeReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [saga, epic],
        preloadedState
    });
    return store;
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

saga.run(employeeSaga);
epic.run(rootEpic);
