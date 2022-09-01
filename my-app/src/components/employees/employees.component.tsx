import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  MainText,
  SecondaryText,
} from '../../styled/employees/employees.styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import {
  selectEmployee,
  getEmployeeFetch,
  selectSubordinates,
  selectSubordinatesToShow,
} from '../../store/employee/employeeSlice';

type Employee = {
  name: string;
  controls: string[];
};

const Employees = () => {
  const [show, setShow] = useState(false);
  const { name } = useParams();
  const url = window.location.href;

  const employee = useSelector(selectEmployee);
  const subordinates = useSelector(selectSubordinatesToShow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeFetch(name));
  }, [dispatch, name]);

  return (
    <Container className="my-5">
      <MainText>Employee:</MainText>
      <SecondaryText>{employee ? employee.name : 'Not Found'} </SecondaryText>

      {subordinates.length !== 0 && (
        <>
          <MainText>Subordinates:</MainText>
          <SecondaryText>{subordinates.join(', ')}</SecondaryText>
        </>
      )}
      {employee && (
        <CopyToClipboard text={url} onCopy={() => setShow(true)}>
          <Button className="float-end mt-3">Copy this URL</Button>
        </CopyToClipboard>
      )}
      <ToastContainer position={'bottom-start'} className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Url is copied to clipboard!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Employees;
