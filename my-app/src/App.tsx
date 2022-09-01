import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Employees from './components/employees/employees.component';
import Search from './components/search/search.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />}>
        <Route path="/:name" element={<Employees />} />
      </Route>
    </Routes>
  );
}

export default App;
