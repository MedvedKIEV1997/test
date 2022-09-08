import { Container, Placeholder } from 'react-bootstrap';
import { MainText, SecondaryText } from '../styled/employees.styles';

const EmployeesPlaceholder = () => {
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
};

export default EmployeesPlaceholder;
