"use client";
import React from "react";
import { Container, Row, Col, Navbar, Nav, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Fundraise() {
  return (
    <div className="bg-white mx-auto" style={{ maxWidth: "1440px" }}>
      {/* Header Section */}
      <Container fluid className="py-5 px-4">
        {/* <Row className="align-items-center">
          <Col xs={12} md={2} className="text-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/09e14f471a30daedeb9b0e0608eb4c8a1a1ac68b?placeholderIfAbsent=true"
              className="img-fluid rounded-circle"
              alt="Company logo"
              style={{ maxWidth: "100px" }}
            />
            <Nav className="justify-content-center mt-3">
              <Nav.Item>
                <Nav.Link className="text-dark fs-4">Home</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={12} md={10} className="text-center mt-4 mt-md-0">
            <div className="d-flex justify-content-end align-items-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/2f71b6665b9ad32c1d519159d3acc13f706866a3?placeholderIfAbsent=true"
                className="img-fluid me-3"
                alt="Search icon"
                style={{ width: "30px" }}
              />
              <div className="d-flex align-items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/31f7ddc563edd9f0c60b858b5a2b15a083ad73cc?placeholderIfAbsent=true"
                  className="img-fluid rounded-circle me-2"
                  alt="Language selector"
                  style={{ width: "31px" }}
                />
                <span className="fs-4 me-2">EN</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/be52b0c845eb9fa11db7c6bcdc8000df5eaeebae?placeholderIfAbsent=true"
                  className="img-fluid"
                  alt="Dropdown arrow"
                  style={{ width: "24px" }}
                />
              </div>
            </div>
          </Col>
        </Row> */}
        <h1 className="mt-5 text-dark fw-bold display-4 text-start ms-3">
          We make it easy to start your project.
        </h1>
      </Container>

      {/* Main Content Section */}
      <Container fluid className="px-4">
        <Row className="mt-5">
          <Col xs={12} md={6} className="mt-4">
            <p className="fs-2 text-dark">
              <span className="fw-bold">Browse</span> hundreds of investment opportunities, connect with investors and manage your investment contacts with the world's investors network.
            </p>
            <div className="mt-5">
              <h3 className="fs-4 fw-bold">Follow Us</h3>
              <div className="d-flex gap-2 mt-3">
                {[
                  "d08d1c7b17113ec12bafd97d86d046d5ba1d3de6",
                  "b5cc48022ac760096a5de64a9a40d75e86140e38",
                  "c48db060c22cbbdbfcda78e79607ef525048b50c",
                  "150c0b317a34eac146955992419d4495b7397420",
                  "e3fa4663eede982f7acd0e9a172c8b1674ac6fb7"
                ].map((id, index) => (
                  <img
                    key={index}
                    src={`https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/${id}?placeholderIfAbsent=true`}
                    className="img-fluid"
                    alt="Social media icon"
                    style={{ width: "50px" }}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="position-relative mt-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/87e77f73034a43f89a19a81b3dbd12e8aa25f50f?placeholderIfAbsent=true"
              className="img-fluid position-absolute w-100 h-100"
              alt="Background pattern"
              style={{ objectFit: "cover" }}
            />
            <div className="bg-dark text-white rounded-4 p-4 mt-5 position-relative" style={{ maxWidth: "500px" }}>
              <Row>
                <Col xs={7}>
                  <div className="d-flex align-items-start">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/9681df83f94dc594a2e0a40495d9952f8487f01e?placeholderIfAbsent=true"
                      className="img-fluid rounded-3 me-3"
                      alt="Investor profile"
                      style={{ width: "80px" }}
                    />
                    <div>
                      <h4 className="fs-3 fw-bold">BOB</h4>
                      <p className="fs-5">Angel Investor</p>
                      <div className="d-flex align-items-center bg-light bg-opacity-75 rounded-3 p-2 mt-2">
                        <span className="fs-5 text-dark me-2">Egypt</span>
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/da4216f546a517d730c2fa80bc4468a55c53600d?placeholderIfAbsent=true"
                          className="img-fluid"
                          alt="Location icon"
                          style={{ width: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={5} className="text-center">
                  <p className="fs-5">EGP 150,000,000</p>
                  <p className="fs-6">Net Worth</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={12} md={7}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/3666f2aae661ac4f4bd012e653c6279a95f54fb8?placeholderIfAbsent=true"
              className="img-fluid rounded-4 shadow"
              alt="Project showcase"
              style={{ maxWidth: "100%", minHeight: "480px" }}
            />
          </Col>
          <Col xs={12} md={5} className="d-flex align-items-center">
            <div className="text-center">
              <h2 className="fs-1 fw-bold">Find investor for your project</h2>
              <p className="fs-4">
                Access the largest opportunities to reach investors in your field. Filter opportunities by country, location, industry, stage, investment range and language to find the deal for you.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Mobile App Section */}
      <section className="bg-dark text-white py-5 px-4 mt-5">
        <Container>
          <h2 className="text-center fs-2">
            Seamless Experience: Our Platform Now Also Accessible via Mobile App
          </h2>
          <Row className="mt-5">
            <Col xs={12} md={8}>
              <div className="d-flex align-items-start">
                <div className="me-3">
                  {[
                    "a8434e1f049ddf5e45408a2140c5b4280ab72ea3",
                    "921f5ec1f30981d7eeedc0a1b61953eb9a53796f",
                    "8c076dd4957b8ff287034280c700254eeb5ed216"
                  ].map((id, index) => (
                    <img
                      key={index}
                      src={`https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/${id}?placeholderIfAbsent=true`}
                      className="img-fluid mb-3"
                      alt={`Feature icon ${index + 1}`}
                      style={{ width: "60px" }}
                    />
                  ))}
                </div>
                <div>
                  <p className="fs-4">
                    Search for opportunists through your private interface.<br />
                    Request a meeting to discuss deals with investors.<br />
                    Manage your project grow and your portfolio.
                  </p>
                  <h3 className="fs-4 mt-3">Download the app</h3>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/20b4ff6e9593b91edd808c2a296609667afc572a?placeholderIfAbsent=true"
                    className="img-fluid mt-3"
                    alt="App store badges"
                    style={{ maxWidth: "300px" }}
                  />
                  <p className="fs-5 mt-2">Available on Android and iOS.</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/88e757e2156092bd9dfdb0d919769ba088523963?placeholderIfAbsent=true"
                className="img-fluid rounded-3"
                alt="Mobile app preview"
                style={{ maxWidth: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Scroll to Top Button */}
      <Button
        variant="light"
        className="position-fixed bottom-0 end-0 m-4 shadow"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/e2eea0565481af2cb1df24eb0e680dcde96c1516?placeholderIfAbsent=true"
          alt="Scroll to top"
          style={{ width: "26px" }}
        />
      </Button>

      {/* Footer Section */}
      {/* <footer className="bg-dark text-white py-5 px-4">
        <Container>
          <Row>
            <Col xs={12} md={3} className="text-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/84ddd82970a0be61541da15899b22678dfd0cbe1?placeholderIfAbsent=true"
                className="img-fluid"
                alt="Footer logo"
                style={{ maxWidth: "200px" }}
              />
              <h3 className="fs-3 mt-4">Navigation</h3>
              <Nav className="flex-column align-items-center mt-3">
                {["Home", "Invest", "Fundraise", "Blogs", "About-Us", "Contact-Us"].map((item, index) => (
                  <Nav.Item key={index} className="d-flex align-items-center">
                    <Nav.Link className="text-white fs-5">{item}</Nav.Link>
                    {index < 5 && (
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/fdf5fe0fa70003f5860d20f6671c7f029b099d5e?placeholderIfAbsent=true"
                        className="img-fluid ms-2"
                        alt="Navigation arrow"
                        style={{ width: "18px" }}
                      />
                    )}
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col xs={12} md={9} className="mt-5 mt-md-0">
              <Row>
                <Col xs={12} md={6} className="text-center">
                  <h3 className="fs-3">Our Newsletter</h3>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true"
                    className="img-fluid my-3"
                    alt="Newsletter decoration"
                    style={{ maxWidth: "150px" }}
                  />
                  <p className="fs-5">
                    Subscribe to our newsletter<br />
                    Don't miss out! Be the first to know about exciting new developments.
                  </p>
                  <Form className="d-flex gap-2 mt-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address..."
                      className="rounded-3 fs-5"
                    />
                    <Button variant="light" className="rounded-3 fs-5" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col xs={12} md={6} className="text-center mt-4 mt-md-0">
                  <h3 className="fs-3">Important Links</h3>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true"
                    className="img-fluid my-3"
                    alt="Links decoration"
                    style={{ maxWidth: "150px" }}
                  />
                  <Nav className="flex-column align-items-center">
                    {["FAQs", "Privacy Policy", "Support"].map((item, index) => (
                      <Nav.Link key={index} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-white fs-5">
                        {item}
                      </Nav.Link>
                    ))}
                  </Nav>
                  <div className="d-flex gap-2 justify-content-center mt-4">
                    {[
                      "d08d1c7b17113ec12bafd97d86d046d5ba1d3de6",
                      "b5cc48022ac760096a5de64a9a40d75e86140e38",
                      "c48db060c22cbbdbfcda78e79607ef525048b50c",
                      "150c0b317a34eac146955992419d4495b7397420",
                      "e3fa4663eede982f7acd0e9a172c8b1674ac6fb7"
                    ].map((id, index) => (
                      <img
                        key={index}
                        src={`https://cdn.builder.io/api/v1/image/assets/b01fe73a9d294126b8ebcdfd94d4804e/${id}?placeholderIfAbsent=true`}
                        className="img-fluid"
                        alt="Social media icon"
                        style={{ width: "50px" }}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer> */}

      {/* Copyright Section */}
      {/* <div className="bg-light text-dark text-center py-3 fs-5">
        Copyright © 2024 Designed by IDEA.
      </div> */}
    </div>
  );
}

export default Fundraise;