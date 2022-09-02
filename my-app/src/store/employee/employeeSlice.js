import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: null,
        subordinates: [],
        subordinatesToShow: [],
        search: [],
        error: null
    },
    reducers: {
        getEmployeeFetch: (state, action) => {
            state.employee = null;
            state.subordinates = [];
            state.subordinatesToShow = [];
            state.error = null;
        },
        getEmployeeSuccess: (state, action) => {
            state.employee = action.payload;
            state.subordinates = action.payload.controls;
            // state.subordinatesToShow = action.payload.controls;
        },
        getEmployeeFailure: (state, action) => {
            state.error = action.payload;
            state.subordinates = [];
            state.subordinatesToShow = [];
        },
        getSubordinatesFetch: (state, action) => {},
        getSubordinatesSuccess: (state, action) => {
            state.subordinatesToShow = [
                ...state.subordinatesToShow,
                ...action.payload
            ];
            console.log(action.payload);
            state.subordinates = action.payload.map((el) => el.controls).flat();
        },
        getSubordinatesFailure: (state, action) => {
            state.error = action.payload;
            state.subordinates = [];
            state.subordinatesToShow = [];
        },
        getSearchFetch: (state, action) => {
            state.search = [];
            state.error = null;
        },
        getSearchSuccess: (state, action) => {
            state.search = action.payload;
        },
        getSearchFailure: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    getEmployeeFailure,
    getEmployeeSuccess,
    getEmployeeFetch,
    getSubordinatesFailure,
    getSubordinatesFetch,
    getSubordinatesSuccess,
    getSearchFailure,
    getSearchFetch,
    getSearchSuccess
} = employeeSlice.actions;

export const selectEmployee = (state) => state.employee.employee;
export const selectSubordinates = (state) => state.employee.subordinates;
export const selectSubordinatesToShow = (state) =>
    state.employee.subordinatesToShow;
export const selectSearch = (state) => state.employee.search;

export default employeeSlice.reducer;
