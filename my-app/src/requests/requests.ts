import axios from "axios";

type Employee = {
  name: string;
  controls: string[];
};

export const getEmployee = async (name: string) => {
  try {
    const response = await axios.get(`localhost:8000/employees/${name}`);
    const employee: Employee = response.data;
    return employee;
  } catch (error) {
    console.log(error);
  }
};
