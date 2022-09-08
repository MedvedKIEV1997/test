import { Routes, Route } from 'react-router-dom';

import { Employees, Search } from './components/';

const App = () => (
    <Routes>
        <Route path="/" element={<Search />}>
            <Route path="/:id" element={<Employees />} />
        </Route>
    </Routes>
);

export default App;
