import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { combineEpics, StateObservable } from 'redux-observable';

import { RootState } from '../store';
import { fetchEmployee, fetchEmployees } from '../../api';

export type Employee = {
    name: string;
    controls: number[];
    id: number;
};

export type SearchEmployeesPayload = {
    name: string;
};

export type GetEmployeePayload = {
    id: number;
};

export type InitialState = {
    employee: Employee | null;
    allEmployees: Employee[];
    subordinates: number[];
    subordinatesToShow: Employee[];
    loading: boolean;
};

export const initialState: InitialState = {
    employee: null,
    allEmployees: [],
    subordinates: [],
    subordinatesToShow: [],
    loading: true
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployee: (state, { payload }: PayloadAction<Employee>) => {
            state.subordinatesToShow = [];
            state.employee = payload;
            state.subordinates = payload.controls;
        },
        setEmployees: (state, { payload }: PayloadAction<Employee[]>) => {
            state.allEmployees = payload;
        },
        setSubordinates: (state, { payload }: PayloadAction<Employee[]>) => {
            state.subordinatesToShow = [...payload];
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        }
    }
});

export const sliceActions = employeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee.employee;

export const selectEmployees = (state: RootState) =>
    state.employee.allEmployees;

export const selectSubordinates = (state: RootState) =>
    state.employee.subordinates;

export const selectSubordinatesToShow = (state: RootState) =>
    state.employee.subordinatesToShow;

export const selectLoading = (state: RootState) => state.employee.loading;

export const getEmployee = createAction<GetEmployeePayload>('getEmployee');

export const getEmployees = createAction('getEmployees');

export const getSubordinates = createAction('getSubordinates');

const getAllSubordinatesToShow = async (subordinates: number[]) => {
    const allSubordinates: Employee[] = [];

    try {
        const gettingSubs = async (subordinates: number[]) => {
            if (subordinates.length !== 0) {
                const response = await Promise.all(
                    subordinates.map(
                        async (id: number) => await fetchEmployee(id)
                    )
                );

                const subordinatesData: Employee[] = response.map(
                    (el) => el.data
                );
                const subordinatesOfSubordinates = subordinatesData
                    .map((subordinate) => subordinate.controls)
                    .flat();

                allSubordinates.push(...subordinatesData);

                await gettingSubs(subordinatesOfSubordinates);
            }
        };
        await gettingSubs(subordinates);
        console.log(allSubordinates);
        return allSubordinates;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getLoadingFalseEpic = (action$: any) =>
    action$.pipe(
        filter(sliceActions.setSubordinates.match),
        map(() => sliceActions.setLoading(false))
    );

const getLoadingTrueEpic = (action$: any) =>
    action$.pipe(
        filter(getEmployee.match),
        map(() => sliceActions.setLoading(true))
    );

const getSubordinatesEpic = (
    action$: any,
    state$: StateObservable<RootState>
) =>
    action$.pipe(
        filter(sliceActions.setEmployee.match),
        switchMap(async () => {
            const subordinates = await getAllSubordinatesToShow(
                state$.value.employee.subordinates
            );
            return sliceActions.setSubordinates(subordinates);
        })
    );

const getEmployeeEpic = (action$: any) =>
    action$.pipe(
        filter(getEmployee.match),
        switchMap((action: ReturnType<typeof getEmployee>) =>
            from(fetchEmployee(action.payload.id)).pipe(
                map((res) => sliceActions.setEmployee(res.data))
            )
        )
    );

const getEmployeesEpic = (action$: any) =>
    action$.pipe(
        filter(getEmployees.match),
        switchMap(() =>
            from(fetchEmployees()).pipe(
                map((response) => sliceActions.setEmployees(response.data))
            )
        )
    );

export const employeeEpic = combineEpics(
    getEmployeesEpic,
    getEmployeeEpic,
    getSubordinatesEpic,
    getLoadingTrueEpic,
    getLoadingFalseEpic
);

export default employeeSlice.reducer;
