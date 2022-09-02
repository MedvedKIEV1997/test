import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';

import {
    MainText,
    SecondaryText
} from '../../styled/employees/employees.styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import useTypedSelector from '../../hooks/useTypedSelectors';
import {
    selectEmployee,
    selectSubordinatesToShow
} from '../../store/employee/employeeSlice';
import useActions from '../../hooks/useActions';

const Employees = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const url = window.location.href;
    const actions = useActions();
    const employee = useTypedSelector(selectEmployee);
    const subordinates = useTypedSelector(selectSubordinatesToShow);

    useEffect(() => {
        actions.getEmployee({ id: Number(id) });
    }, [id]);

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
