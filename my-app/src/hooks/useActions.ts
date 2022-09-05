import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEmployee, getEmployees } from '../redux/ducks/employee.duck';

const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ getEmployee, getEmployees }, dispatch);
};

export default useActions;
