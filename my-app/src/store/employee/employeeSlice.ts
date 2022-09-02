import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Employee } from './employeeTypes';

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

export const sliceActions = employeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee.employee;
export const selectSubordinates = (state: RootState) =>
    state.employee.subordinates;
export const selectSubordinatesToShow = (state: RootState) =>
    state.employee.subordinatesToShow;
export const selectSearch = (state: RootState) => state.employee.search;

export default employeeSlice.reducer;
