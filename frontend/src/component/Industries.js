import React from 'react';
import TechnologyImg from '../assets/img-0.8.png';
import PropertyImg from '../assets/img-0.4.png';
import EducationImg from '../assets/img-0.3.png';
import MedicineImg from '../assets/img-0.6.png';
import SustainabilityImg from '../assets/img-0.7.png';
import CulinaryImg from '../assets/img-0.5.png';

const industries = [
  { img: TechnologyImg, text: 'Technology & Software' },
  { img: PropertyImg, text: 'Property & Housing' },
  { img: EducationImg, text: 'Education & Training' },
  { img: MedicineImg, text: 'Medicine & Health' },
  { img: SustainabilityImg, text: 'Sustainability' },
  { img: CulinaryImg, text: 'Culinary' },
];


function Industries() {
  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">Our Industries</h1>
      <div className="row justify-content-center">
        {industries.map((industry, index) => (
          <div key={index} className="col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
            <div className="IndustriesBox">
              <img src={industry.img} alt={industry.text} />
              <div className="overlay">
                <span className="IndustriesText">{industry.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Industries;
