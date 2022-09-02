import { ChangeEvent, FormEvent, useState } from 'react';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import {
    getSearchFetch,
    selectSearch
} from '../../store/employee/employeeSlice';
import { Employee } from '../employees/employees.component';

const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const searched: Employee[] = useSelector(selectSearch);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(getSearchFetch(search));
        setSearch('');
    };

    return (
        <Container className="p-5" fluid>
            <Row>
                <Col xs={12} md={5} lg={4} xl={3}>
                    <Stack gap={3}>
                        <Stack
                            as={Form}
                            onSubmit={handleSubmit}
                            direction="horizontal"
                            gap={2}
                        >
                            <Form.Control
                                placeholder="Write name here.."
                                onChange={handleChange}
                                value={search}
                            />
                            <Link to={search}>
                                <Button>Search</Button>
                            </Link>
                        </Stack>
                        {searched.length !== 0 && (
                            <Row xs="auto">
                                {searched.map((el) => (
                                    <Col key={el.id}>
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
