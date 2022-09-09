import { Routes, Route } from 'react-router-dom';

import { Employees, Search, EmployeesTable } from './components/';

const App = () => (
    <Routes>
        <Route path="/" element={<Search />}>
            <Route path="/:id" element={<Employees />} />
            <Route path="/table" element={<EmployeesTable />} />
        </Route>
    </Routes>
);

export default App;
