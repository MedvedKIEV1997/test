import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Search from './Search';
import { BrowserRouter as Router } from 'react-router-dom';
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
    renderWithProviders(
        <Router>
            <Search />
        </Router>
    );
    it('renders searchbar', () => {
        const searchBar = screen.getByPlaceholderText(/Write name here/i);
        expect(searchBar).toBeInTheDocument();
    });
});
