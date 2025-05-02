import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../Common/Card";
import { useFunctions } from "../../../useFunctions";

function ClientInvestorHome() {
  const navigate = useNavigate();
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);
  const firstLogin = useSelector((state) => state.clientAuth.clientData?.firstLogin);
  const { project = [], loading, error, getAllProjects } = useFunctions();

  // Redirect to investorPreferences if firstLogin is true
  useEffect(() => {
    if (clientRole === 'Investor' && firstLogin === true) {
      navigate('/client-portal/investor/investorPreferences', { replace: true });
    }
  }, [clientRole, firstLogin, navigate]);

  // Fetch projects on mount
  useEffect(() => {
    getAllProjects().catch((err) => {
      toast.error(`Failed to load projects: ${err.message}`);
    });
  }, []);

  // Handle retry on error
  const handleRetry = () => {
    getAllProjects().catch((err) => {
      toast.error(`Failed to load projects: ${err.message}`);
    });
  };

  return (
    <Container fluid className="py-5" style={{ maxWidth: "1280px", backgroundColor: "white", color: "black" }}>
      {loading && (
        <p className="text-center">Loading projects...</p>
      )}
      {error && !loading && (
        <div className="text-center">
          <p style={{ color: "red" }}>{error}</p>
          <Button variant="primary" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      )}
      {!loading && !error && project.length === 0 && (
        <p className="text-center">No projects found.</p>
      )}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {project.map((project) => (
          <Col key={project._id}>
            <Card project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ClientInvestorHome;