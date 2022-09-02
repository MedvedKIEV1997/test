import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    searchEmployees,
    getEmployee
} from '../store/employee/employeeActions';

const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ searchEmployees, getEmployee }, dispatch);
};

export default useActions;
