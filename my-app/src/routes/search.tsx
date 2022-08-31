import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

const Search = () => {
  return (
    <Container className="p-5">
      <Form className="d-flex">
        <Form.Control className="mx-2" placeholder="Write name here.." />
        <Button>Search</Button>
      </Form>
      <Outlet />
    </Container>
  );
};

export default Search;
