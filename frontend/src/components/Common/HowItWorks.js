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
    slidesToScroll: 1,
  };

  const investorSlides = [
    {
      imgSrc: img1,
      description: 'Create your account as an investor and search for startups',
    },
    {
      imgSrc: img2,
      description: 'Verify Your account to get the right offers',
    },
    {
      imgSrc: img3,
      description: 'Start searching for the right startup with your industry preferences',
    },
    {
      imgSrc: img4,
      description: 'Start investing on your chosen startup',
    },
  ];

  const entrepreneurSlides = [
    {
      imgSrc: img1,
      description: 'Create your account as an entrepreneur and start your project',
    },
    {
      imgSrc: img2,
      description: 'Verify your account and get connected with investors',
    },
    {
      imgSrc: img5,
      description: 'Step into the world of entrepreneurship and start creating your project with our comprehensive support system',
    },
    {
      imgSrc: img6,
      description: 'Launch your project and unlock the potential to raise money with our dedicated platform',
    },
  ];

  const renderSlides = (slides) =>
    slides.map((slide, index) => (
      <div
        className="flex flex-col items-center p-2 sm:p-2.5"
        key={index}
      >
        <img
          src={slide.imgSrc}
          alt={slide.description}
          className="w-full h-[50vh] sm:h-[300px] md:h-[400px] object-cover my-2 sm:my-2.5"
        />
        <div className="text-center py-2 sm:py-2.5">
          <p className="text-sm sm:text-base">{slide.description}</p>
        </div>
      </div>
    ));

  return (
    <div className="text-center py-6 sm:py-8 md:py-10">
      <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
        How it Works?
      </h1>
      <div className="h-4 sm:h-6"></div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-evenly items-center">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-[300px] sm:max-w-[400px] mx-2 sm:mx-5 my-2 sm:my-5 p-4 sm:p-5 text-center transition-transform duration-300 hover:-translate-y-2.5">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Investor</h2>
          <Slider {...settings}>{renderSlides(investorSlides)}</Slider>
          <div className="mt-2 sm:mt-2.5 flex flex-col sm:flex-row justify-around gap-2 sm:gap-4">
            <Link
              to="/invest"
              className="w-full sm:w-[40%] bg-[#D9EFFF] text-black border border-white shadow-md py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-[#b0d5f0] transition-colors"
            >
              Read More
            </Link>
            <Link
              to="/client-portal/"
              className="w-full sm:w-[40%] bg-blue-600 text-white border border-white shadow-md py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-blue-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg w-full max-w-[300px] sm:max-w-[400px] mx-2 sm:mx-5 my-2 sm:my-5 p-4 sm:p-5 text-center transition-transform duration-300 hover:-translate-y-2.5">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            Entrepreneur
          </h2>
          <Slider {...settings}>{renderSlides(entrepreneurSlides)}</Slider>
          <div className="mt-2 sm:mt-2.5 flex flex-col sm:flex-row justify-around gap-2 sm:gap-4">
            <Link
              to="/fundraising"
              className="w-full sm:w-[40%] bg-[#D9EFFF] text-black border border-white shadow-md py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-[#b0d5f0] transition-colors"
            >
              Read More
            </Link>
            <Link
              to="/client-portal/"
              className="w-full sm:w-[40%] bg-blue-600 text-white border border-white shadow-md py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-blue-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;