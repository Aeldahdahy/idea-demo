import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFunctions } from '../../../useFunctions';
import { decryptId } from '../../../Security/encryptionUtils';
import defaultImage from '../../../assets/img-0.47.png';
import { setMeetingStatus, suppressChecks, clearMeetingStatus, setMeetingError } from '../../../redux/meetingSlice'; 
import {jwtDecode} from 'jwt-decode'; // Assuming you have a jwt-decode library installed

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
  const { getProjectById, createMeeting, cancelMeeting, checkMeetingStatus, loading, error, API_BASE_URL } = useFunctions();
  const dispatch = useDispatch();
  const { meetingStatus, meetingId, suppressChecksUntil } = useSelector((state) => state.meeting);
  const [projectData, setProjectData] = useState(null);
  const [investorId, setInvestorId] = useState(null);

  let projectId;
  try {
    projectId = decryptId(encryptedProjectId);
  } catch (error) {
    console.error('Failed to decrypt project ID:', error);
    projectId = null;
  }

  // Placeholder function to get investor ID
  const getInvestorId = async () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        // Replace with actual logic to decode the token or fetch investor ID
        // Example: Decode JWT token to get user ID
        const decoded = jwtDecode(authToken); // Assuming you use jwt-decode
        return decoded.userId; // Adjust based on your token structure
      } catch (err) {
        console.error('Failed to decode auth token:', err);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const initialize = async () => {
      if (!projectId) {
        return;
      }
  
      try {
        // Fetch project data only if not already loaded
        if (!projectData) {
          const project = await getProjectById(projectId);
          if (project) {
            setProjectData(project);
          }
        }
  
        // Fetch investor ID only if not already set
        if (!investorId) {
          const invId = await getInvestorId();
          setInvestorId(invId);
        }
  
        // Check meeting status if not suppressed and all required data is available
        if (
          projectData &&
          investorId &&
          (!suppressChecksUntil || Date.now() >= suppressChecksUntil)
        ) {
          const statusResponse = await checkMeetingStatus(
            projectId,
            investorId,
            projectData.user_id
          );
          dispatch(
            setMeetingStatus({
              status: statusResponse.status,
              meetingId: statusResponse.exists ? statusResponse.meetingId : null,
            })
          );
  
          // Suppress further checks for 1 hour if status is null
          if (!statusResponse.exists || statusResponse.status === null) {
            const oneHourFromNow = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
            dispatch(suppressChecks(oneHourFromNow));
          }
        }
      } catch (err) {
        console.error('Error during initialization:', err);
        dispatch(setMeetingError(err.message));
      }
    };
  
    initialize();
  }, [projectId, projectData, investorId, suppressChecksUntil, dispatch, getProjectById, checkMeetingStatus]);

  const handleMeetingRequest = async () => {
    if (meetingStatus && meetingStatus !== 'Cancelled' && meetingStatus !== 'Completed') {
      // Cancel the meeting
      try {
        await cancelMeeting(meetingId);
        dispatch(clearMeetingStatus());
      } catch (err) {
        console.error('Failed to cancel meeting:', err);
        dispatch(setMeetingError(err.message));
      }
    } else {
      // Request a meeting
      try {
        const meetingData = {
          project_id: projectId,
          entrepreneur_id: projectData.user_id,
        };
        const response = await createMeeting(meetingData);
        dispatch(setMeetingStatus({
          status: 'Requested',
          meetingId: response.data._id,
        }));

        // Check status one more time after creating the meeting
        try {
          const statusResponse = await checkMeetingStatus(projectId, investorId, projectData.user_id);
          dispatch(setMeetingStatus({
            status: statusResponse.status,
            meetingId: statusResponse.exists ? statusResponse.meetingId : null,
          }));
          // Suppress further checks
          const oneHourFromNow = Date.now() + 60 * 60 * 1000;
          dispatch(suppressChecks(oneHourFromNow));
        } catch (err) {
          console.error('Failed to check meeting status after creation:', err);
          dispatch(setMeetingError(err.message));
        }
      } catch (err) {
        console.error('Failed to request meeting:', err);
        dispatch(setMeetingError(err.message));
      }
    }
  };

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

  // Determine button text and color based on meeting status
  const canRequestMeeting = !meetingStatus || meetingStatus === 'Cancelled' || meetingStatus === 'Completed';
  const buttonText = canRequestMeeting ? 'Request Meeting' : 'Cancel Request';
  const buttonColor = canRequestMeeting ? '#0033A0' : '#dc3545';

  return (
    <>
      <div className="spacemax"></div>
      <Container fluid className="py-10" style={{ fontFamily: "'Inter', sans-serif", width: '95%', padding: '0 15px' }}>
        <Row className="g-5 justify-content-between">
          <Col md={5} className="d-flex align-items-center">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="rounded-xl w-100 object-cover"
                    style={{
                      maxWidth: '700px',
                      height: '500px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={3} className="d-flex flex-column">
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>{projectData.project_name || 'N/A'}</h2>
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
          <Col md={3} className="d-flex flex-column">
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
            <div className="mb-4">
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Project Details:</h3>
              <ul className="list-disc list-inside" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>Industry: {projectData.project_industry || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Stage: {projectData.project_stage || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Financial Status: {projectData.financial_status || 'N/A'}</li>
                <li style={{ marginBottom: '4px' }}>Status: {projectData.status || 'N/A'}</li>
              </ul>
            </div>
            <div>
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
        <Row>
          <Col md={{ span: 8, offset: 4 }} className="mt-4 d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: buttonColor,
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                padding: '12px 32px',
                borderRadius: '9999px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '210px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)')}
              onMouseLeave={(e) => (e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')}
              onClick={handleMeetingRequest}
              disabled={loading || !investorId}
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="spacemax"></div>
    </>
  );
}

export default ClientInvestorViewProject;