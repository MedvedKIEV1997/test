const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8000;

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

app.use(cors());

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    const employee = employees.find((el) => el.id === Number(id));

    if (employee) {
        res.json(employee);
    } else {
        res.sendStatus(404);
    }
});

app.get('/employees/search/:name', (req, res) => {
    const name = req.params.name;
    const employeesToFind = employees.filter((el) =>
        el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );

    if (employeesToFind.length) {
        res.send(employeesToFind);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log('running');
});
