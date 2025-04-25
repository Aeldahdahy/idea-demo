import React from "react";
import { Card } from "react-bootstrap";
import defaultImage from "../../../assets/img-0.45.png";
import defaultLogo from "../../../assets/img-0.46.png";
import { Link } from "react-router-dom";
import { useFunctions } from "../../../useFunctions";

function CustomCard({ project }) {
  const { API_BASE_URL } = useFunctions();
  console.log("Project data:", project); // Debugging line to check project data

  const projectImage = project.project_images && project.project_images[0]
    ? `${API_BASE_URL}/${project.project_images[0]}`
    : defaultImage;

  const projectLocation = `${project.city || "N/A"}, ${project.state || "N/A"}`;

  return (
    <Card
      className="shadow-sm overflow-hidden"
      style={{ backgroundColor: "#e6ebf5", maxWidth: "28rem", margin: "0 auto", borderRadius: "0.75rem" }}
    >
      <Card.Img
        variant="top"
        src={projectImage}
        alt={`Image for ${project.project_name || "project"}`}
        style={{ height: "12rem", objectFit: "cover", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}
      />
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-white p-2 rounded shadow"
            style={{ flexShrink: 0 }}
          >
            <img
              src={defaultLogo} // Assuming no logo field in project data; use default
              alt={`Logo for ${project.project_name || "project"}`}
              style={{ width: "3.5rem", height: "3.5rem", objectFit: "contain" }}
            />
          </div>
          <div className="ms-3">
            <Card.Title as="h3" className="mb-0" style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
              {project.project_name || "N/A"}
            </Card.Title>
            <p className="d-flex align-items-center text-secondary mb-0" style={{ fontSize: "0.875rem" }}>
              <i className="fas fa-map-marker-alt me-1"></i>
              {projectLocation}
            </p>
          </div>
        </div>
        <Card.Text className="text-center mb-4" style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
          {project.business_description || "No description available."}
        </Card.Text>
        <ul className="list-unstyled mb-4 ps-4" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
          <li className="d-flex align-items-center mb-2">
            <i className="fas fa-check me-2"></i>
            Industry: {project.project_industry || "N/A"}
          </li>
          <li className="d-flex align-items-center">
            <i className="fas fa-check me-2"></i>
            Status: {project.status || "N/A"}
          </li>
        </ul>
        <div className="text-center">
          <Link
            style={{
              backgroundColor: "#0039a6",
              borderColor: "#0039a6",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: "bold",
              padding: "0.5rem 2rem",
              borderRadius: "9999px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#002a75")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0039a6")}
            to={`/client-portal/investor/viewProject/${project._id}`}
          >
            View Project
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;