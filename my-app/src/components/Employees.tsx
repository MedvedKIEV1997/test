import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    Button,
    Toast,
    ToastContainer,
    Container,
    Placeholder
} from 'react-bootstrap';

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
        return (
            <Container className="my-5 position-relative">
                <Placeholder as={MainText} animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as={SecondaryText} animation="glow">
                    <Placeholder xs={3} />
                </Placeholder>
                <Placeholder as={MainText} animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as={SecondaryText} animation="glow">
                    <Placeholder xs={2} /> <Placeholder xs={3} />{' '}
                    <Placeholder xs={2} />
                </Placeholder>

                <Placeholder.Button
                    className="position-absolute top-0 end-0"
                    animation="glow"
                >
                    Copy this URL
                </Placeholder.Button>
            </Container>
        );
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
