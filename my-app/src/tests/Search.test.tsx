import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../components/Search';
import { employees, renderWithProviders } from './test-utils';
import { initialState } from '../redux/ducks/employee.duck';

describe('search component tests', () => {
    const setup = () => {
        return {
            user: userEvent.setup(),
            ...renderWithProviders(<Search />, {
                preloadedState: {
                    employee: {
                        ...initialState,
                        allEmployees: employees
                    }
                }
            })
        };
    };

    it('should match a snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should filter all employees and get Link "Lin Cheng"', async () => {
        const { user } = setup();
        const searchBar = screen.getByPlaceholderText(/Write name here/i);
        await user.type(searchBar, 'lin');
        expect(
            screen.getByRole('button', { name: 'Lin Cheng' })
        ).toBeInTheDocument();
    });

    it('should filter all employees and do not find Link "Dew Kelg"', async () => {
        const { user } = setup();
        const searchBar = screen.getByPlaceholderText(/Write name here/i);
        await user.type(searchBar, 'lin');
        expect(
            screen.queryByRole('button', { name: 'Dew Kelg' })
        ).not.toBeInTheDocument();
    });
});
