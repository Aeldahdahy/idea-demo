import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import CarouselImg1 from '../assets/img-0.18.jpg';
import CarouselImg2 from '../assets/img-0.19.png';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

function CarouselMain() {  
  return (
    <div className='carousel-rounded-bottom-custom'>
      <Carousel fade>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100 carousel-image"
            src={CarouselImg2}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="text-white">Welcome to IDEA</h1>
            <p className="text-white">Where Tomorrow's Innovative Ideas Meet Today's Investors.</p>
            <div className="buttons-container">
              <Button className='MainButton' variant="primary">Get started <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100 carousel-image"
            src={CarouselImg1}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1 className="text-white">Welcome to IDEA</h1>
            <p className="text-white">Where Tomorrow's Innovative Ideas Meet Today's Investors.</p>
            <div className="buttons-container">
              <Button className='MainButton' variant="primary">Get started <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img
            className="d-block w-100 carousel-image"
            src={CarouselImg2}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1 className="text-white">Welcome to IDEA</h1>
            <p className="text-white">Where Tomorrow's Innovative Ideas Meet Today's Investors.</p>
            <div className="buttons-container">
              <Button className='MainButton' variant="primary">Get started <FontAwesomeIcon icon="fa-solid fa-arrow-right" /></Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselMain;
