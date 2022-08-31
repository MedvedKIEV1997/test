import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MainText, SecondaryText } from "./employees.styles";

type Employee = {
  name: string;
  controls: string[];
};

const Employees = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [subordinates, setSubordinates] = useState<string[]>([]);
  const [subordinatesToShow, setSubordinatesToShow] = useState<string[]>([]);

  const { name } = useParams();

  const getEmployee = async (name: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/employees/${name}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const data = await getEmployee(name);
        const resolvedData: Employee = data;
        if (resolvedData.controls) {
          console.log(resolvedData.name);
          setEmployee(resolvedData);
          setSubordinates(resolvedData.controls);
          setSubordinatesToShow(resolvedData.controls);
        } else {
          setEmployee({ name: "Not Found", controls: [] });
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNewSubordinates = async (subordinates: string[]) => {
      const newSubordinates = await Promise.all(
        subordinates.map(async (el) => {
          const data = await getEmployee(el);
          const resolvedData: Employee = data;
          return resolvedData.controls;
        })
      );
      return newSubordinates;
    };

    if (subordinates.length !== 0) {
      fetchNewSubordinates(subordinates).then((el) => {
        const newSubordinates = el.flat();

        setSubordinatesToShow([...subordinatesToShow, ...newSubordinates]);
        setSubordinates(newSubordinates);
      });
    }
    console.log(subordinatesToShow);
  }, [subordinates]);

  return (
    <Container className="my-5">
      <MainText>Employee:</MainText>
      <SecondaryText>{employee?.name && employee.name} </SecondaryText>

      {subordinatesToShow.length !== 0 && (
        <>
          <MainText>Subordinates:</MainText>
          <SecondaryText>{subordinatesToShow.join(", ")}</SecondaryText>
        </>
      )}
    </Container>
  );
};

export default Employees;
