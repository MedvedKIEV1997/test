import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    MainText,
    SecondaryText
} from '../../styled/employees/employees.styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import {
    selectEmployee,
    getEmployeeFetch,
    selectSubordinatesToShow
} from '../../store/employee/employeeSlice';

export type Employee = {
    name: string;
    controls: string[];
    id: number;
};

const Employees = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const url = window.location.href;

    const employee: Employee = useSelector(selectEmployee);
    const subordinates: Employee[] = useSelector(selectSubordinatesToShow);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeFetch(id));
    }, [dispatch, id]);

    return (
        <Container className="my-5">
            <MainText>Employee:</MainText>
            <SecondaryText>
                {employee ? employee.name : 'Not Found'}{' '}
            </SecondaryText>

            {subordinates.length !== 0 && (
                <>
                    <MainText>Subordinates:</MainText>
                    <SecondaryText>
                        {subordinates.map((el) => el.name).join(', ')}
                    </SecondaryText>
                </>
            )}
            {employee && (
                <CopyToClipboard text={url} onCopy={() => setShow(true)}>
                    <Button className="float-end mt-3">Copy this URL</Button>
                </CopyToClipboard>
            )}
            <ToastContainer position={'bottom-start'} className="p-3">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>Url is copied to clipboard!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Employees;
