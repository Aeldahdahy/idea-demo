import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFunctions } from '../../../useFunctions';
import { decryptId } from '../../../Security/encryptionUtils';
import defaultImage from '../../../assets/img-0.47.png';

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
  const { projectId: encryptedProjectId } = useParams();
  const { getProjectById, loading, error, API_BASE_URL } = useFunctions();
  const [projectData, setProjectData] = useState(null);

  let projectId;
  try {
    projectId = decryptId(encryptedProjectId);
  } catch (error) {
    console.error('Failed to decrypt project ID:', error);
    projectId = null;
  }

  useEffect(() => {
    if (!projectId) {
      toast.error('Invalid project ID. The ID may not be properly encrypted.');
      return;
    }

    const fetchProject = async () => {
      const data = await getProjectById(projectId);
      if (data) {
        setProjectData(data);
      }
    };
    fetchProject();
  }, [projectId, getProjectById]);

  if (!projectId) {
    return (
      <div className="text-center py-5">
        <p style={{ color: 'red' }}>
          Invalid project ID. The ID may not be properly encrypted or the encryption key is incorrect.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-5">Loading project...</div>;
  }

  if (error || !projectData) {
    return (
      <div className="text-center py-5">
        <p style={{ color: 'red' }}>{error || 'Failed to load project data.'}</p>
      </div>
    );
  }

  const images = projectData.project_images?.length
    ? projectData.project_images.map((img) => `${API_BASE_URL}/${img}`)
    : [defaultImage, defaultImage, defaultImage];

  const projectLocation = `${projectData.city || 'N/A'}, ${projectData.state || 'N/A'}`;
  const teamMembers = projectData.team_members || [
    { imgSrc: 'https://storage.googleapis.com/a1aa/image/abf03e13-68b5-46a6-e63b-b76ddf536465.jpg', altText: 'Abdelrahman Tarek', name: 'Abdelrahman Tarek', role: 'Founder' },
    { imgSrc: 'https://storage.googleapis.com/a1aa/image/587ca089-11c7-44f5-2055-d6bd97c2a9ed.jpg', altText: 'Taha Salah', name: 'Taha Salah', role: 'Co-founder' },
  ];
  const highlights = projectData.bussiness_highlights
    ? projectData.bussiness_highlights.split('\n').filter((item) => item.trim() !== '')
    : ['No highlights available.'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Carousel Section - 35% of the page height */}
      <div style={{ height: '35vh', width: '100%' }}>
        <Carousel style={{ height: '100%' }}>
          {images.map((image, index) => (
            <Carousel.Item key={index} style={{ height: '35vh' }}>
              <img
                src={image}
                alt={`Project ${index + 1}`}
                className="rounded-xl w-100 object-cover"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Content Section - 65% of the page height */}
      <Container
        fluid
        className="py-4"
        style={{
          flex: '1',
          height: '65vh',
          overflowY: 'auto',
          fontFamily: "'Inter', sans-serif",
          padding: '0 15px',
        }}
      >
        <Row className="g-4">
          <Col md={4} className="d-flex flex-column">
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>
              {projectData.project_name || 'N/A'}
            </h2>
            <div className="d-flex align-items-center gap-2 mb-4" style={{ fontSize: '16px' }}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{projectLocation}</span>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Description:</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                {projectData.business_description || 'No description available.'}
              </p>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Business Objectives:</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                {projectData.business_objectives || 'No objectives available.'}
              </p>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Market Description:</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                {projectData.market_description || 'No market description available.'}
              </p>
            </div>
            {projectData.website_link && (
              <div className="mb-4">
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Website:</h3>
                <a
                  href={projectData.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '16px', lineHeight: '1.5', color: '#0033A0' }}
                >
                  {projectData.website_link}
                </a>
              </div>
            )}
          </Col>
          <Col md={4} className="d-flex flex-column">
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Highlights:</h3>
              <ul className="list-disc list-inside" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                {highlights.map((highlight, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Investment Details:</h3>
              <ul className="list-disc list-inside" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>Deal Type: {projectData.deal_type || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Min Investment: {projectData.min_investment || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Max Investment: {projectData.max_investment || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Net Worth: {projectData.networth || 'N/A'}</li>
              </ul>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column">
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Project Details:</h3>
              <ul className="list-disc list-inside" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>Industry: {projectData.project_industry || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Stage: {projectData.project_stage || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Financial Status: {projectData.financial_status || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Status: {projectData.status || 'N/A'}</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Team Members:</h3>
              <div className="d-flex flex-column gap-4">
                {teamMembers.map((member, index) => (
                  <TeamMember
                    key={index}
                    imgSrc={member.imgSrc}
                    altText={member.altText}
                    name={member.name}
                    role={member.role}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClientInvestorViewProject;