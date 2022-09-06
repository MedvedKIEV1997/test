import { rest } from 'msw';

import { url } from '../api';

const employees = [
    {
        name: 'Doug Lime',
        controls: [2, 3],
        id: 1
    },
    {
        name: 'Lin Cheng',
        controls: [4, 5],
        id: 2
    },
    {
        name: 'Bob Welp',
        controls: [7, 8],
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
        name: 'Mort Dog',
        controls: [],
        id: 7
    },
    {
        name: 'Forman Go',
        controls: [],
        id: 8
    }
];

export const handlers = [
    rest.get(url, (req, res, ctx) => {
        console.log('here');
        return res(ctx.json(employees), ctx.delay(150));
    })
];
