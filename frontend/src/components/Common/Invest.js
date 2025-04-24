"use client";
import * as React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Invest() {
  return (
    <div className="bg-white">
      <Container fluid className="py-5">
        <Row className="mb-5">
          <Col md={12} className="text-start px-4">
            <h1 className="display-5 mt-5">We make it easy to start investing.</h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <h3 className="h4">
              <strong>Browse</strong> hundreds of investment opportunities, connect
              with entrepreneurs, and manage your investment contacts with the
              world's Entrepreneur network.
            </h3>
            <h5 className="mt-4">Follow Us</h5>
            <div className="d-flex gap-2 mt-3">
              {[
                "5af065c5520ae218cda23d2494f00a15430cab52",
                "974c3c3e7f16f24929b6e8d24ef8dd072fe0e2ec",
                "76333511bb5bb69d2acf99a1f8e3bb83d721eb40",
                "9920bdb6c892f438fe0415b5d5a29a3b395cafba",
                "0ed0b013dd8bcdf2dc854fc2ec5ec7ce0f861456",
              ].map((id) => (
                <img
                  key={id}
                  src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${id}?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97`}
                  alt="Social Icon"
                  className="img-fluid"
                  style={{ width: "40px", height: "40px" }}
                />
              ))}
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="position-relative border-0" style={{position:"relative"}}>
              <Card.Img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d11bd8b663851db6a3d75e21352ea0c8fbee94df?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Background"
                className="img-fluid"
              />
              <Card.Body className="p-4" style={{position:"absolute"}}>
                {[
                  { bg: "bg-primary text-white", textColor: "text-white" },
                  { bg: "bg-light", textColor: "text-dark" },
                ].map((style, index) => (
                  <Card key={index} className={`mb-3 rounded-4 ${style.bg}`}>
                    <Card.Body className="d-flex flex-column flex-md-row">
                      <div className="flex-grow-1">
                        <div className="d-flex gap-3">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b45c590850af54ec1ea5a845137c9a2eda78b1d8?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                            alt="Venture"
                            className="img-fluid rounded-3"
                            style={{ width: "60px" }}
                          />
                          <div>
                            <h4 className="mb-1">IDEA-Venture</h4>
                            <p className="mb-1">Investment Start-up</p>
                            <p className="mb-0">Seed stage</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className={`mb-1 ${style.textColor}`}>
                          EGP 15,000
                        </p>
                        <small>Min per Investor</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={7} className="mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0e2ef40b67c649e8c470d8e700d29d9848bb50d?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Investment"
              className="img-fluid rounded-4"
            />
          </Col>
          <Col md={5} className="d-flex align-items-center">
            <div className="text-center">
              <h3 className="h4">
                <strong>Find the best investment deals</strong>
              </h3>
              <p className="fs-5">
                Access the largest network of entrepreneurs. Filter opportunities
                by country, location, industry, stage, investment range, and
                language to find the deal for you.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-dark text-white py-5">
        <Container>
          <h3 className="text-center mb-5">
            Seamless Experience: Our Platform Now Also Accessible via Mobile App
          </h3>
          <Row>
            <Col md={7} className="mb-4">
              <div className="d-flex flex-column">
                <div className="d-flex gap-3">
                  <div>
                    {[
                      "a39aa70844f377d8877c85e557b86f96dfb96900",
                      "6232b12c7b72a4a29282e2e00f5696e6eafa5b77",
                      "68e65d213653dede69c85cd5a84748327c655ba9",
                    ].map((id) => (
                      <img
                        key={id}
                        src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${id}?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97`}
                        alt="Icon"
                        className="img-fluid mb-3"
                        style={{ width: "50px" }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="fs-5">
                      Search and manage deals through your private interface.
                      <br />
                      Request a meeting to discuss deals with projects.
                      <br />
                      Manage your investments and grow your portfolio.
                    </p>
                  </div>
                </div>
                <h4 className="mt-3">Download the app</h4>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f41d287b76cd6ddf44a546860a7cac4325cee0?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  alt="App Store"
                  className="img-fluid"
                  style={{ width: "200px" }}
                />
                <p className="fs-6">Available on Android and iOS.</p>
              </div>
            </Col>
            <Col md={5} className="mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a93abb4711467a15340e6046acdd9b712df4c797?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Mobile App"
                className="img-fluid rounded-3" style={{width:"65%"}}
              />
            </Col>
          </Row>
        </Container>
      </div>

      

      
    </div>
  );
}

export default Invest;

// Custom CSS for additional styling
<style jsx>{`
  .bg-gradient {
    background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%);
  }
  .navbar-light .navbar-nav .nav-link {
    color: #000;
    font-weight: 500;
  }
  .navbar-light .navbar-nav .nav-link:hover {
    color: #3b82f6;
  }
  h1.display-4 {
    font-size: 3.5rem;
    line-height: 1.2;
  }
  .card {
    transition: transform 0.3s;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .rounded-5 {
    border-radius: 50px !important;
  }
`}</style>