import { createAction } from '@reduxjs/toolkit';
import { GetEmployeePayload, SearchEmployeesPayload } from './employeeTypes';

export const searchEmployees =
    createAction<SearchEmployeesPayload>('searchEmployees');

export const getEmployee = createAction<GetEmployeePayload>('getEmployee');

export const getSubordinates = createAction('getSubordinates');
