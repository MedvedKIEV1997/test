import { fetchEmployee, fetchEmployees } from '../api';
import { employees } from './test-utils';

describe('api tests', () => {
    it('should be equal to mocked data', async () => {
        const { data } = await fetchEmployees();
        expect(data).toEqual(employees);
    });
    it('should be equal to mocked employee with id 1', async () => {
        const { data } = await fetchEmployee(1);
        expect(data).toEqual(employees[0]);
    });
});
