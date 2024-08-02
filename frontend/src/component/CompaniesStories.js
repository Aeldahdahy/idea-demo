import React from 'react';
// import { Container, Carousel, Card, Button } from 'react-bootstrap';
// import { useFunctions } from '../useFunctions';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import image01 from '../assets/img-0.9.PNG';
import image02 from '../assets/img-0.10.PNG';
import image03 from '../assets/img-0.11.PNG';

function CompaniesStories() {
  // const { stories, chunkArray, loading, error } = useFunctions();
  // const storyChunks = chunkArray(stories, 3);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error loading stories: {error.message}</div>;

  return (
    // <Container className="CompaniesStoriesContainer my-5" fluid>
    //   <h2 className="text-center mb-4">Success Stories</h2>
    //   <Carousel>
    //     {storyChunks.map((chunk, index) => (
    //       <Carousel.Item key={index}>
    //         <div className="d-flex justify-content-around flex-wrap">
    //           {chunk.map((story, idx) => (
    //             <Card key={idx} className="StoriresCardContainer mb-4 mx-auto" style={{ maxWidth: '18rem' }}>
    //               <Card.Img
    //                 variant="top"
    //                 src={story.image}
    //                 className="rounded-circle mx-auto mt-3"
    //                 style={{ width: '150px', height: '150px' }}
    //               />
    //                <Card.Body className="text-center d-flex flex-column justify-content-around">
    //                 <Card.Title>{story.name}</Card.Title>
    //                 <Card.Text>{story.text}</Card.Text>
    //                 <div>
    //                     <Button className='MainButton' variant="primary">Read More</Button>
    //                 </div>
    //               </Card.Body>
    //             </Card>
    //           ))}
    //         </div>
    //       </Carousel.Item>
    //     ))}
    //   </Carousel>
    // </Container>

    
      <Container className="CompaniesStoriesContainer my-5" fluid>
        <h2 className="text-center mb-4">Success Stories</h2>
        <Row className="d-flex justify-content-around flex-wrap">
          <Col md={4} className="mb-4">
            <Card className="StoriresCardContainer mx-auto" style={{ maxWidth: '18rem' }}>
              <Card.Img
                variant="top"
                src={image01}
                className="rounded-circle mx-auto mt-3"
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Body className="text-center d-flex flex-column justify-content-around">
                <Card.Title>Fati's</Card.Title>
                <Card.Text>
                Founded by Fatma Ahmed, this bakery specializes in handcrafted donuts in classic and unique flavors. They've taken social media by storm, particularly TikTok, becoming a go-to spot for satisfying your sweet tooth.
                </Card.Text>
                <div>
                  <Button className="MainButton" variant="primary">Read More</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="StoriresCardContainer mx-auto" style={{ maxWidth: '18rem' }}>
              <Card.Img
                variant="top"
                src={image02}
                className="rounded-circle mx-auto mt-3"
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Body className="text-center d-flex flex-column justify-content-around">
                <Card.Title>POV</Card.Title>
                <Card.Text>
                  POV Egypt invents clever solutions in Egypt, for Egypt. Think: phone holders that work in the heat, or innovative gadgets to tackle common hassles.
                </Card.Text>
                <div>
                  <Button className="MainButton" variant="primary">Read More</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="StoriresCardContainer mx-auto" style={{ maxWidth: '18rem' }}>
              <Card.Img
                variant="top"
                src={image03}
                className="rounded-circle mx-auto mt-3"
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Body className="text-center d-flex flex-column justify-content-around">
                <Card.Title>Cult</Card.Title>
                <Card.Text>
                Cult Egypt offers a unique fusion, serving up delicious New York-style bagels alongside specialty matcha drinks. Its a trendy spot to grab a satisfying breakfast or a tasty afternoon pick-me-up.
                </Card.Text>
                <div>
                  <Button className="MainButton" variant="primary">Read More</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

  );
}

export default CompaniesStories;
