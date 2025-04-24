import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function BlogSeparator() {
  return (
    <Container className="blog-separator">
      <Row className="align-items-center">
        <Col className="flex-grow-1">
          <div className="separator-line"></div>
        </Col>
        <Col xs="auto">
          <div className="separator-icon">
            <div className="icon-line"></div>
            <div className="icon-line"></div>
          </div>
        </Col>
        <Col className="flex-grow-1">
          <div className="separator-line"></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="separator-text">
            Grow wealth like a tree, roots<br />
            in savings, branches reaching toward diverse investments.
          </p>
        </Col>
      </Row>
      <Row>
      <Col className="flex-grow-1">
          <div className="separator-line"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogSeparator;