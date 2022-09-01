import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Search = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(search);
    setSearch('');
  };

  return (
    <Container className="p-5">
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          className="mx-2"
          placeholder="Write name here.."
          onChange={handleChange}
          value={search}
        />
        <Link to={search}>
          <Button>Search</Button>
        </Link>
      </Form>
      <Outlet />
    </Container>
  );
};

export default Search;
