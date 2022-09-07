import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Employees from '../components/Employees';
import { renderWithProviders } from './test-utils';
import { initialState } from '../redux/ducks/employee.duck';

describe('employees component tests', () => {
    const setup = () => {
        return {
            user: userEvent.setup(),
            ...renderWithProviders(
                <MemoryRouter>
                    <Employees />
                </MemoryRouter>,
                {
                    preloadedState: {
                        employee: {
                            ...initialState,
                            loading: false,
                            employee: {
                                name: 'Bob',
                                controls: [5, 6],
                                id: 11
                            },
                            subordinatesToShow: [
                                {
                                    name: 'Leam',
                                    controls: [],
                                    id: 5
                                },
                                {
                                    name: 'Caren',
                                    controls: [],
                                    id: 6
                                }
                            ]
                        }
                    }
                }
            )
        };
    };

    it('should match a snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });
});
