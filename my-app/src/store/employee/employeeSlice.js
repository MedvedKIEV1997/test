import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: null,
    subordinates: [],
    subordinatesToShow: [],

    error: null,
  },
  reducers: {
    getEmployeeFetch: (state, action) => {
      state.employee = null;
      state.subordinates = [];
      state.error = null;
    },
    getEmployeeSuccess: (state, action) => {
      state.employee = action.payload;
      state.subordinates = action.payload.controls;
      state.subordinatesToShow = action.payload.controls;
    },
    getEmployeeFailure: (state, action) => {
      state.error = action.payload;
      state.subordinates = [];
      state.subordinatesToShow = [];
    },
    getSubordinatesFetch: (state, action) => {
      state.subordinatesToShow = state.subordinates;
    },
    getSubordinatesSuccess: (state, action) => {
      state.subordinatesToShow = [
        ...state.subordinatesToShow,
        ...action.payload,
      ];
      state.subordinates = action.payload;
    },
    getSubordinatesFailure: (state, action) => {
      state.error = action.payload;
      state.subordinates = [];
      state.subordinatesToShow = [];
    },
  },
});

export const {
  getEmployeeFailure,
  getEmployeeSuccess,
  getEmployeeFetch,
  getSubordinatesFailure,
  getSubordinatesFetch,
  getSubordinatesSuccess,
} = employeeSlice.actions;

export const selectEmployee = (state) => state.employee.employee;
export const selectSubordinates = (state) => state.employee.subordinates;
export const selectSubordinatesToShow = (state) =>
  state.employee.subordinatesToShow;

export default employeeSlice.reducer;
