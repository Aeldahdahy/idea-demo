import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeamMember({ imgSrc, altText, name, role }) {
  return (
    <div className="d-flex align-items-center gap-4">
      <img
        src={imgSrc}
        alt={altText}
        className="rounded-full object-cover"
        style={{ width: '48px', height: '48px' }}
      />
      <div>
        <p style={{ fontSize: '14px', fontWeight: '800', lineHeight: '1.2' }}>{name}</p>
        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '1.2' }}>{role}</p>
      </div>
    </div>
  );
}

function ClientInvestorViewProject() {
  return (
    <Container className="py-10" style={{ maxWidth: '1200px', fontFamily: "'Inter', sans-serif" }}>
      <Row className="g-5">
        <Col lg={5}>
          <img
            src="https://storage.googleapis.com/a1aa/image/958fe962-5322-4222-0cf7-fd69f10499f8.jpg"
            alt="Cityscape with skyscrapers and cranes at sunset with warm golden light reflecting on buildings and water"
            className="rounded-xl w-100 object-cover"
            style={{
              maxWidth: '500px',
              height: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Col>
        <Col lg={7} className="d-flex flex-column justify-content-between">
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>IDEA-Venture</h2>
            <div className="d-flex align-items-center gap-2 mb-4" style={{ fontSize: '16px' }}>
              <i className="fas fa-user-friends"></i>
              <span>Cairo, Egypt</span>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Description:</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.5', maxWidth: '448px' }}>
                IDEA-Venture aims to empower entrepreneurs to shape the future and guide investors to place their money in strategic investments.
              </p>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Highlights:</h3>
              <ul className="list-disc list-inside" style={{ maxWidth: '448px', fontSize: '16px', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>Provide a reliable, accessible, and efficient platform for investors to manage their investments effectively.</li>
                <li style={{ marginBottom: '4px' }}>Provide exposure for unrecognized projects.</li>
                <li>Encourage wider adoption of online investing.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Team Members:</h3>
              <div className="d-flex flex-column gap-4" style={{ maxWidth: '448px' }}>
                <TeamMember
                  imgSrc="https://storage.googleapis.com/a1aa/image/abf03e13-68b5-46a6-e63b-b76ddf536465.jpg"
                  altText="Profile picture of Abdelrahman Tarek, a man with black shirt and hand on chin"
                  name="Abdelrahman Tarek"
                  role="Founder"
                />
                <TeamMember
                  imgSrc="https://storage.googleapis.com/a1aa/image/587ca089-11c7-44f5-2055-d6bd97c2a9ed.jpg"
                  altText="Profile picture of Taha Salah, a man with black shirt and hand on chin"
                  name="Taha Salah"
                  role="Co-founder"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: '#0033A0',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                padding: '12px 32px',
                borderRadius: '9999px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '160px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)')}
              onMouseLeave={(e) => (e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')}
            >
              Request Meeting
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientInvestorViewProject;