import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import * as actions from './employeeActions';
import { selectSubordinates, sliceActions } from './employeeSlice';
import { Employee } from './employeeTypes';

function* searchEmployees(action: ReturnType<typeof actions.searchEmployees>) {
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

function* getEmployee(action: ReturnType<typeof actions.getEmployee>) {
    const {
        payload: { id }
    } = action;

    try {
        const { data }: AxiosResponse<Employee> = yield call(
            axios.get,
            `http://localhost:8000/employees/${id}`
        );

        yield put(sliceActions.setEmployee(data));

        yield call(getSubordinates);
    } catch (error) {
        console.log(error);
    }
}

//I've tried to get the type
function* getSubordinates(): any {
    try {
        const subordinates: ReturnType<typeof selectSubordinates> =
            yield select(selectSubordinates);

        if (subordinates.length !== 0) {
            const response: AxiosResponse[] = yield all(
                subordinates.map((id) => {
                    const response = call(
                        axios.get,
                        `http://localhost:8000/employees/${id}`
                    );
                    return response;
                })
            );

            const subordinatesData: Employee[] = response.map((el) => el.data);

            yield put(sliceActions.setSubordinates(subordinatesData));

            yield* getSubordinates();
        }
    } catch (error) {
        console.log(error);
    }
}

function* watchSearch() {
    yield takeLatest(actions.searchEmployees.type, searchEmployees);
}

function* watchGetEmployee() {
    yield takeLatest(actions.getEmployee.type, getEmployee);
}

function* employeeSaga() {
    yield all([call(watchGetEmployee), call(watchSearch)]);
}

export default employeeSaga;
