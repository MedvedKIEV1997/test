const express = require("express");

const app = express();

const PORT = 8000;

const employees = [
  {
    name: "Doug Lime",
    controls: ["Lin Cheng", "Bob Welp"],
  },
  {
    name: "Lin Cheng",
    controls: ["Dakota Stein", "Mongo K", "Dew Dong"],
  },
  {
    name: "Bob Welp",
    controls: ["Mort Dog", "Forman Go", "Dew Kelg"],
  },
  {
    name: "Dakota Stein",
    controls: [],
  },
  {
    name: "Mongo K",
    controls: [],
  },
  {
    name: "Dew Dong",
    controls: [],
  },
  {
    name: "Mort Dog",
    controls: [],
  },
  {
    name: "Forman Go",
    controls: [],
  },
  {
    name: "Dew Kelg",
    controls: [],
  },
];

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.get("/employees/:name", (req, res) => {
  const name = req.params.name;
  const employee = employees.find((el) =>
    el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );
  res.json(employee);
});

app.listen(PORT, () => {
  console.log("running");
});
