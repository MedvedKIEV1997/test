import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

import { Link, Outlet } from 'react-router-dom';
import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelectors';
import { Employee, selectEmployees } from '../redux/ducks/employee.duck';

const Search = () => {
    const [employeesToShow, setEmployeesToShow] = useState<Employee[]>([]);

    const allEmployees = useTypedSelector(selectEmployees);
    const actions = useActions();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmployeesToShow(
            allEmployees.filter((el) =>
                el.name
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
            )
        );
    };

    useEffect(() => {
        actions.getEmployees();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setEmployeesToShow(allEmployees);
    }, [allEmployees]);

    return (
        <Container className="p-5" fluid>
            <Row>
                <Col xs={12} md={5} lg={4} xl={3}>
                    <Stack gap={3}>
                        <Form.Control
                            placeholder="Write name here.."
                            onChange={handleChange}
                        />

                        {employeesToShow.length !== 0 && (
                            <Row xs="auto">
                                {employeesToShow.map((el) => (
                                    <Col key={el.id} className="mb-2 px-1">
                                        <Link to={'' + el.id}>
                                            <Button variant="outline-primary">
                                                {el.name}
                                            </Button>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Stack>
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Search;
