import React from "react";
import { Routes, Route } from "react-router-dom";
import Employees from "./routes/employees/employees";
import Search from "./routes/search";

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
