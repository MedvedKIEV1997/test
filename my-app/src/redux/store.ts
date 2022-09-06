import {
    combineReducers,
    configureStore,
    PreloadedState
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import employeeReducer from './ducks/employee.duck';
import { employeeSaga } from './ducks/employee.duck';

const saga = createSagaMiddleware();

const rootReducer = combineReducers({
    employee: employeeReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [saga],
        preloadedState
    });
    return store;
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

saga.run(employeeSaga);
