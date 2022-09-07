import { fetchEmployee, fetchEmployees } from './api';

describe('api testing', () => {
    test('fetchEmployees', async () => {
        const { data } = await fetchEmployees();
        expect(data).toMatchSnapshot();
    });
    test('fetchEmployee returns id 1', async () => {
        const { data } = await fetchEmployee(1);
        expect(data).toMatchSnapshot();
    });
});
