import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  getEmployeeFailure,
  getEmployeeFetch,
  getEmployeeSuccess,
  getSubordinatesFailure,
  getSubordinatesFetch,
  getSubordinatesSuccess,
  selectSubordinates,
} from './employeeSlice';

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
      const data = yield all(
        subordinates.map((el) => {
          const response = call(
            axios.get,
            `http://localhost:8000/employees/${el}`
          );
          return response;
        })
      );
      const newSubordinates = data.map((el) => el.data.controls).flat();

      yield put(getSubordinatesSuccess(newSubordinates));
      yield call(workGetSubordinatesFetch);
    }
  } catch (error) {
    yield put(getSubordinatesFailure(error));
  }
}

function* onEmployeeFetch() {
  yield takeLatest(getEmployeeFetch.type, workGetEmployeeFetch);
}

function* onSubordinatesFetch() {
  yield takeLatest(getSubordinatesFetch.type, workGetSubordinatesFetch);
}

export function* employeeSaga() {
  yield all([call(onEmployeeFetch), call(onSubordinatesFetch)]);
}

export default employeeSaga;
