import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

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

const initialState: InitialState = {
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
            state.subordinatesToShow = [
                ...state.subordinatesToShow,
                ...payload
            ];
            state.subordinates = payload.map((el) => el.controls).flat();
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

export const searchEmployees =
    createAction<SearchEmployeesPayload>('searchEmployees');

export const getEmployee = createAction<GetEmployeePayload>('getEmployee');

export const getEmployees = createAction('getEmployees');

function* getEmployeesAsync() {
    try {
        const { data }: AxiosResponse<Employee[]> = yield call(fetchEmployees);
        yield put(sliceActions.setEmployees(data));
    } catch (error) {
        console.log(error);
    }
}

function* getEmployeeAsync(action: ReturnType<typeof getEmployee>) {
    const {
        payload: { id }
    } = action;

    try {
        const { data }: AxiosResponse<Employee> = yield call(fetchEmployee, id);

        yield put(sliceActions.setEmployee(data));

        yield* getSubordinatesAsync();
    } catch (error) {
        console.log(error);
        yield put(sliceActions.setLoading(false));
    }
}

function* getSubordinatesAsync(): any {
    try {
        const subordinates: ReturnType<typeof selectSubordinates> =
            yield select(selectSubordinates);

        if (subordinates.length !== 0) {
            const response: AxiosResponse[] = yield all(
                subordinates.map((id: number) => call(fetchEmployee, id))
            );

            const subordinatesData: Employee[] = response.map((el) => el.data);

            yield put(sliceActions.setSubordinates(subordinatesData));

            yield* getSubordinatesAsync();
        }
        yield put(sliceActions.setLoading(false));
    } catch (error) {
        yield put(sliceActions.setLoading(false));
        console.log(error);
    }
}

function* watchGetEmployee() {
    yield takeLatest(getEmployee.type, getEmployeeAsync);
}
function* watchGetEmployees() {
    yield takeLatest(getEmployees.type, getEmployeesAsync);
}

export function* employeeSaga() {
    yield all([call(watchGetEmployee), call(watchGetEmployees)]);
}

export default employeeSlice.reducer;
