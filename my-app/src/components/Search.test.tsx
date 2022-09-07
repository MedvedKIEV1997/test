import { fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import Search from './Search';
import { renderWithProviders } from '../test-utils';
import { initialState } from '../redux/ducks/employee.duck';
const employees = [
    {
        name: 'Doug Lime',
        controls: [2, 3],
        id: 1
    },
    {
        name: 'Lin Cheng',
        controls: [4, 5, 6],
        id: 2
    },
    {
        name: 'Bob Welp',
        controls: [7, 8, 9],
        id: 3
    },
    {
        name: 'Dakota Stein',
        controls: [],
        id: 4
    },
    {
        name: 'Mongo K',
        controls: [],
        id: 5
    },
    {
        name: 'Dew Dong',
        controls: [],
        id: 6
    },
    {
        name: 'Mort Dog',
        controls: [],
        id: 7
    },
    {
        name: 'Forman Go',
        controls: [],
        id: 8
    },
    {
        name: 'Dew Kelg',
        controls: [],
        id: 9
    }
];

describe('search component', () => {
    const setup = () => {
        const history = createMemoryHistory();
        return {
            user: userEvent.setup(),
            ...renderWithProviders(
                <Router location={history.location} navigator={history}>
                    <Search />
                </Router>,
                {
                    preloadedState: {
                        employee: {
                            ...initialState,
                            allEmployees: employees
                        }
                    }
                }
            )
        };
    };

    it('matches snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });

    it('filters all employees', async () => {
        const { user } = setup();
        const searchBar = screen.getByPlaceholderText(/Write name here/i);
        await user.type(searchBar, 'lin');
        expect(
            screen.queryByRole('button', { name: 'Dew Kelg' })
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Lin Cheng' })
        ).toBeInTheDocument();
    });
});
