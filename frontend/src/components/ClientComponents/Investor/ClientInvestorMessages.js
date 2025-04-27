import React from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlidersH,
  faSearch,
  faPaperclip,
  faFileUpload,
  faImage,
  faTrash,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// Placeholder data for messages
const messages = [
  {
    id: 1,
    name: 'Taha Elrajel',
    preview:
      'A design is a plan or specification for the construction of an object or system or for the implementation of activity or process...',
    profilePic: 'https://storage.googleapis.com/a1aa/image/5048aeaa-19d8-4935-193e-3476255cc50c.jpg',
    borderColor: 'border-primary',
  },
  {
    id: 2,
    name: 'Taha Elrajel',
    preview:
      'A design is a plan or specification for the construction of an object or system or for the implementation of activity or process...',
    profilePic: 'https://storage.googleapis.com/a1aa/image/5048aeaa-19d8-4935-193e-3476255cc50c.jpg',
    borderColor: 'border-danger',
  },
  // Add more messages as needed
];

// Placeholder data for selected message content
const selectedMessage = {
  name: 'Taha Elrajel',
  profilePic: 'https://storage.googleapis.com/a1aa/image/5048aeaa-19d8-4935-193e-3476255cc50c.jpg',
  content: [
    'Hi,',
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process.',
    'The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan may also be considered to be a design activity.',
    'yours,',
    'Taha Elrajel',
  ],
  attachments: [
    { name: 'Primary-contract.pdf', size: '1.56Mb', iconColor: 'bg-primary' },
    { name: 'Project-wireframes.zip', size: '4.29Mb', iconColor: 'bg-warning' },
  ],
};

function ClientInvestorMessages() {
  return (
    <Container fluid className="min-vh-100 d-flex flex-column">
      <Row className="flex-grow-1 overflow-hidden">
        {/* Left Sidebar */}
        <Col md={3} className="border-end d-flex flex-column bg-light">
          {/* Sidebar Header */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h2 className="h6 fw-semibold">Messages</h2>
            <Button variant="link" aria-label="Filter messages">
              <FontAwesomeIcon icon={faSlidersH} />
            </Button>
          </div>
          {/* Search Bar */}
          <div className="p-3">
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="search" placeholder="Search" className="fs-6" />
            </InputGroup>
          </div>
          {/* Message Cards */}
          <div className="flex-grow-1 overflow-auto p-3">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`mb-3 cursor-pointer shadow-sm border-start border-4 ${message.borderColor}`}
              >
                <Card.Body className="p-3 d-flex align-items-center">
                  <Image
                    src={message.profilePic}
                    roundedCircle
                    width={40}
                    height={40}
                    alt={`Profile picture of ${message.name}`}
                    className="me-3"
                  />
                  <div className="text-truncate">
                    <div className="fw-semibold text-dark">{message.name}</div>
                    <div className="text-muted small text-truncate" style={{ maxWidth: '180px' }}>
                      {message.preview}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        {/* Right Content */}
        <Col md={9} className="d-flex flex-column bg-white">
          {/* Load Previous Messages */}
          <div className="p-3 border-bottom text-center text-muted small">
            Load 3 previous messages
          </div>
          {/* Message Header */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h3 className="h6">Meeting Details</h3>
            <Image
              src={selectedMessage.profilePic}
              roundedCircle
              width={40}
              height={40}
              alt={`Profile picture of ${selectedMessage.name}`}
            />
          </div>
          {/* Message Content */}
          <div className="flex-grow-1 overflow-auto p-4 small text-dark">
            {selectedMessage.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
            {/* Attachments */}
            <div className="d-flex flex-column gap-3 mt-4" style={{ maxWidth: '300px' }}>
              {selectedMessage.attachments.map((attachment, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  <div
                    className={`d-flex align-items-center justify-content-center rounded ${attachment.iconColor}`}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <FontAwesomeIcon icon={faPaperclip} className="text-white fs-5" />
                  </div>
                  <div className="small">
                    <div className="fw-semibold text-dark">{attachment.name}</div>
                    <div className="text-muted">{attachment.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Message Input Form */}
          <Form
            className="d-flex align-items-center gap-3 p-4 border-top"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="text"
              placeholder="Message"
              className="flex-grow-1 small"
            />
            <Button variant="light" aria-label="Attach file">
              <FontAwesomeIcon icon={faFileUpload} />
            </Button>
            <Button variant="light" aria-label="Attach image">
              <FontAwesomeIcon icon={faImage} />
            </Button>
            <Button variant="light" aria-label="Delete message">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button variant="primary" aria-label="Send message" type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientInvestorMessages;