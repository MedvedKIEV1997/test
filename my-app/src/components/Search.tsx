import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Col, Form, Row, Stack, Container, Button } from 'react-bootstrap';

import useActions from '../hooks/useActions';
import useTypedSelector from '../hooks/useTypedSelectors';
import { Employee, selectEmployees } from '../redux/ducks/employee.duck';
import { CustomButton } from '../styled/search.styles';

const Search = () => {
    const [employeesToShow, setEmployeesToShow] = useState<Employee[]>([]);

    const allEmployees = useTypedSelector(selectEmployees);
    const actions = useActions();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmployeesToShow(
            allEmployees.filter((employee) =>
                employee.name
                    .toLocaleLowerCase()
                    .includes(event.target.value.toLocaleLowerCase())
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
                            placeholder="Write name here..."
                            onChange={handleChange}
                        />

                        {employeesToShow.length !== 0 && (
                            <Row className="g-2 ">
                                {employeesToShow.map((employee) => (
                                    <Col
                                        xl={3}
                                        md={4}
                                        sm={2}
                                        xs={4}
                                        key={employee.id}
                                        className="d-flex"
                                    >
                                        <Link
                                            to={'' + employee.id}
                                            className="w-100"
                                        >
                                            <CustomButton variant="outline-primary">
                                                {employee.name}
                                            </CustomButton>
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
