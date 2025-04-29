import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import CustomCard from "./CustomeCard"; 

function ClientInvestorMyInvestment() {
  return (
    <Container fluid className="py-5" style={{ maxWidth: "1280px", backgroundColor: "white", color: "black" }}>
    {/* <Row xs={1} sm={2} className="g-4">
      <Col>
        <CustomCard />
      </Col>
      <Col>
        <CustomCard />
      </Col>
    </Row> */}
  </Container>
  );
}

export default ClientInvestorMyInvestment;