import React from "react";
import { Card } from "react-bootstrap";
import image1 from "../../../assets/img-0.45.png";
import image2 from "../../../assets/img-0.46.png";
import { Link } from "react-router-dom";

function CustomCard() {
    return (
      <Card
        className="shadow-sm overflow-hidden"
        style={{ backgroundColor: "#e6ebf5", maxWidth: "28rem", margin: "0 auto", borderRadius: "0.75rem" }}
      >
        <Card.Img
          variant="top"
          src={image1}
          alt="Cityscape night view with tall modern buildings and bright lights reflecting on water with mountains in background"
          style={{ height: "12rem", objectFit: "cover", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}
        />
        <Card.Body className="p-4">
          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-white p-2 rounded shadow"
              style={{ flexShrink: 0 }}
            >
              <img
                src={image2}
                alt="Company logo with colorful wing design in red, orange, teal, and black on white background"
                style={{ width: "3.5rem", height: "3.5rem", objectFit: "contain" }}
              />
            </div>
            <div className="ms-3">
              <Card.Title as="h3" className="mb-0" style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                IDEA-Venture
              </Card.Title>
              <p className="d-flex align-items-center text-secondary mb-0" style={{ fontSize: "0.875rem" }}>
                <i className="fas fa-map-marker-alt me-1"></i>
                Cairo, Egypt
              </p>
            </div>
          </div>
          <Card.Text className="text-center mb-4" style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
            IDEA-Venture aims to empower entrepreneurs to shape the future and guide investors to place their money in strategic investments.
          </Card.Text>
          <ul className="list-unstyled mb-4 ps-4" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
            <li className="d-flex align-items-center mb-2">
              <i className="fas fa-check me-2"></i>
              Connect Startups with potential Investors
            </li>
            <li className="d-flex align-items-center">
              <i className="fas fa-check me-2"></i>
              Provide guidance for both investors and startups
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
              to="/client-portal/investor/viewProject"
            >
              View Project
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
}

export default CustomCard;