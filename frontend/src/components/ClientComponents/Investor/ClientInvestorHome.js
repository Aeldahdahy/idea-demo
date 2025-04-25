import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomCard from "./CustomeCard";
import { useFunctions } from "../../../useFunctions";

function ClientInvestorHome() {
  const { project = [], loading, error, getAllProjects } = useFunctions();

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  return (
    <Container fluid className="py-5" style={{ maxWidth: "1280px", backgroundColor: "white", color: "black" }}>
      {loading && <p>Loading projects...</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
      {project.length === 0 && !loading && !error && <p>No projects found.</p>}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {project.map((project) => (
          <Col key={project._id}>
            <CustomCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ClientInvestorHome;