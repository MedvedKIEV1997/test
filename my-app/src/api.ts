import axios from 'axios';

export const url = 'http://localhost:8000/employees';

export const fetchEmployee = async (id: number) => {
    try {
        return await axios.get(`${url}/${id}`);
    } catch (error) {
        throw error;
    }
};

export const fetchEmployees = async () => {
    try {
        return await axios.get(url);
    } catch (error) {
        throw error;
    }
};
