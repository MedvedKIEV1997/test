import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createAction } from '@reduxjs/toolkit';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

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

type InitialState = {
    employee: Employee | null;
    subordinates: number[];
    subordinatesToShow: Employee[];
    search: Employee[];
};

const initialState: InitialState = {
    employee: null,
    subordinates: [],
    subordinatesToShow: [],
    search: []
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<Employee[]>) => {
            state.search = payload;
        },

        setEmployee: (state, { payload }: PayloadAction<Employee>) => {
            state.subordinatesToShow = [];
            state.employee = payload;
            state.subordinates = payload.controls;
        },
        setSubordinates: (state, { payload }: PayloadAction<Employee[]>) => {
            state.subordinatesToShow = [
                ...state.subordinatesToShow,
                ...payload
            ];
            state.subordinates = payload.map((el) => el.controls).flat();
        }
    }
});

const sliceActions = employeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee.employee;

export const selectSubordinates = (state: RootState) =>
    state.employee.subordinates;

export const selectSubordinatesToShow = (state: RootState) =>
    state.employee.subordinatesToShow;

export const selectSearch = (state: RootState) => state.employee.search;

export const searchEmployees =
    createAction<SearchEmployeesPayload>('searchEmployees');

export const getEmployee = createAction<GetEmployeePayload>('getEmployee');

function* searchEmployeesAsync(action: ReturnType<typeof searchEmployees>) {
    const {
        payload: { name }
    } = action;
    try {
        const { data }: AxiosResponse<Employee[]> = yield call(
            axios.get,
            `http://localhost:8000/employees/search/${name}`
        );
        yield put(sliceActions.setSearch(data));
    } catch (error) {
        console.log(error);
    }
}

function* getEmployeeAsync(action: ReturnType<typeof getEmployee>) {
    const {
        payload: { id }
    } = action;

    try {
        const { data }: AxiosResponse<Employee> = yield call(
            axios.get,
            `http://localhost:8000/employees/${id}`
        );

        yield put(sliceActions.setEmployee(data));

        yield* getSubordinatesAsync();
    } catch (error) {
        console.log(error);
    }
}

//I've tried to get the type
function* getSubordinatesAsync(): any {
    try {
        const subordinates: ReturnType<typeof selectSubordinates> =
            yield select(selectSubordinates);

        if (subordinates.length !== 0) {
            const response: AxiosResponse[] = yield all(
                subordinates.map((id: number) =>
                    call(axios.get, `http://localhost:8000/employees/${id}`)
                )
            );

            const subordinatesData: Employee[] = response.map((el) => el.data);

            yield put(sliceActions.setSubordinates(subordinatesData));

            yield* getSubordinatesAsync();
        }
    } catch (error) {
        console.log(error);
    }
}

function* watchSearch() {
    yield takeLatest(searchEmployees.type, searchEmployeesAsync);
}

function* watchGetEmployee() {
    yield takeLatest(getEmployee.type, getEmployeeAsync);
}

export function* employeeSaga() {
    yield all([call(watchGetEmployee), call(watchSearch)]);
}

export default employeeSlice.reducer;
