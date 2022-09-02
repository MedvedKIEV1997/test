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
