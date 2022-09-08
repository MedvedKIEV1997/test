import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Toast, ToastContainer, Container } from 'react-bootstrap';

import EmployeesPlaceholder from './EmployeesPlaceholder';
import { MainText, SecondaryText } from '../styled/employees.styles';
import useTypedSelector from '../hooks/useTypedSelectors';
import {
    selectEmployee,
    selectLoading,
    selectSubordinatesToShow
} from '../redux/ducks/employee.duck';
import useActions from '../hooks/useActions';

const Employees = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const url = window.location.href;
    const actions = useActions();
    const employee = useTypedSelector(selectEmployee);
    const subordinates = useTypedSelector(selectSubordinatesToShow);
    const isLoading = useTypedSelector(selectLoading);

    useEffect(() => {
        actions.getEmployee({ id: Number(id) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return <EmployeesPlaceholder />;
    } else {
        return (
            <Container className="my-5 position-relative">
                <MainText>Employee:</MainText>
                <SecondaryText>
                    {employee ? employee.name : 'Not Found'}{' '}
                </SecondaryText>

                {subordinates.length !== 0 && (
                    <>
                        <MainText>Subordinates:</MainText>
                        <SecondaryText>
                            {subordinates
                                .map((subordinate) => subordinate.name)
                                .join(', ')}
                        </SecondaryText>
                    </>
                )}
                {employee && (
                    <CopyToClipboard text={url} onCopy={() => setShow(true)}>
                        <Button className="position-absolute top-0 end-0">
                            Copy this URL
                        </Button>
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
    }
};

export default Employees;
