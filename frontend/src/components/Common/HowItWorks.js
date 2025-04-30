import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/img-0.34.png';
import img2 from '../../assets/img-0.32.png';
import img3 from '../../assets/img-0.27.png';
import img4 from '../../assets/img-0.33.png';
import img5 from '../../assets/img-0.28.png';
import img6 from '../../assets/img-0.31.png';
import { Link } from 'react-router-dom';



function HowItWorks() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const investorSlides = [
    {
      imgSrc: img1, 
      description: 'Create your account as an investor and search for startups'
    },
    {
      imgSrc: img2, 
      description: 'Verify Your account to get the right offers'
    },
    {
      imgSrc: img3, 
      description: 'Start searching for the right startup with your industry preferences'
    },
    {
      imgSrc: img4, 
      description: 'Start investing on your chosen startup'
    }
  ];

  const entrepreneurSlides = [
    {
      imgSrc: img1, 
      description: 'Create your account as an entrepreneur and start your project'
    },
    {
      imgSrc: img2, 
      description: 'verify your account and get connected with investors'
    },
    {
      imgSrc: img5, 
      description: 'Step into the world of entrepreneurship and start creating your project with our comprehensive support system'
    },
    {
      imgSrc: img6, 
      description: 'Launch your project and unlock the potential to raise money with our dedicated platform'
    }
  ];

  const renderSlides = (slides) => slides.map((slide, index) => (
    <div className="HowItWorksCarousel-slide" key={index}>
      <img src={slide.imgSrc} alt={slide.title} className="HowItWorksCarousel-image" />
      <div className="HowItWorksCarousel-text">
        <p>{slide.description}</p>
      </div>
    </div>
  ));

  return (
    <div className='HowItWorks'>
      <h1 className="mb-4" style={{ fontSize: 35, fontWeight: "bold"}}>How it Works?</h1>
      <div className='space'></div>
      <div className='HowItWorksCon'>
        <div className='HowItWorksCard'>
          <h2 style={{fontSize: 20, fontWeight:"bold"}}>Investor</h2>
          <Slider {...settings}>
            {renderSlides(investorSlides)}
          </Slider>
          <div className="HowItWorksCarousel-buttons">
            <Link to='/invest' className="HowItWorksRead MainButton">Read More</Link>
            <Link to='/client-portal/' className="HowItWorksGet MainButton">Get Started</Link>
        </div>
        </div>

        <div className='HowItWorksCard'>
          <h2 style={{fontSize: 20, fontWeight:"bold"}}>Entrepreneur</h2>
          <Slider {...settings}>
            {renderSlides(entrepreneurSlides)}
          </Slider>
          <div className="HowItWorksCarousel-buttons">
          <Link to='/fundraising' className="HowItWorksRead MainButton">Read More</Link>
          <Link to='/client-portal/' className="HowItWorksGet MainButton">Get Started</Link>
        </div>
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;