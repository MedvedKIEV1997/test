import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    getEmployeeFailure,
    getEmployeeFetch,
    getEmployeeSuccess,
    getSearchFailure,
    getSearchFetch,
    getSearchSuccess,
    getSubordinatesFailure,
    getSubordinatesFetch,
    getSubordinatesSuccess,
    selectSubordinates
} from './employeeSlice';

function* workGetSearchFetch({ payload }) {
    try {
        const response = yield call(
            axios.get,
            `http://localhost:8000/employees/search/${payload}`
        );
        yield put(getSearchSuccess(response.data));
    } catch (error) {
        yield put(getSearchFailure(error));
    }
}

function* workGetEmployeeFetch({ payload }) {
    try {
        const response = yield call(
            axios.get,
            `http://localhost:8000/employees/${payload}`
        );
        yield put(getEmployeeSuccess(response.data));
        yield call(workGetSubordinatesFetch);
    } catch (error) {
        yield put(getEmployeeFailure(error));
    }
}

function* workGetSubordinatesFetch() {
    try {
        const subordinates = yield select(selectSubordinates);
        if (subordinates.length !== 0) {
            const response = yield all(
                subordinates.map((id) => {
                    const response = call(
                        axios.get,
                        `http://localhost:8000/employees/${id}`
                    );
                    return response;
                })
            );

            const subordinatesData = response.map((el) => el.data);
            console.log(subordinatesData);
            yield put(getSubordinatesSuccess(subordinatesData));
            yield call(workGetSubordinatesFetch);
        }
    } catch (error) {
        yield put(getSubordinatesFailure(error));
    }
}

function* onSearchFetch() {
    yield takeLatest(getSearchFetch.type, workGetSearchFetch);
}

function* onEmployeeFetch() {
    yield takeLatest(getEmployeeFetch.type, workGetEmployeeFetch);
}

function* onSubordinatesFetch() {
    yield takeLatest(getSubordinatesFetch.type, workGetSubordinatesFetch);
}

export function* employeeSaga() {
    yield all([
        call(onEmployeeFetch),
        call(onSubordinatesFetch),
        call(onSearchFetch)
    ]);
}

export default employeeSaga;
