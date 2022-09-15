import {
    Action,
    combineReducers,
    configureStore,
    PreloadedState
} from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import employeeReducer from './ducks/employee.duck';
import { employeeEpic } from './ducks/employee.duck';

const epic = createEpicMiddleware<Action<any>, Action<any>, RootState, any>();

const rootEpic = combineEpics(employeeEpic);

const rootReducer = combineReducers({
    employee: employeeReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [epic],
        preloadedState
    });
    return store;
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

epic.run(rootEpic);
