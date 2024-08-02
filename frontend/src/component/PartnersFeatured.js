import React from 'react';
import company1 from '../assets/img-0.17.png';
import company2 from '../assets/img-0.13.jpg';
import company3 from '../assets/img-0.14.png';
import company4 from '../assets/img-0.15.webp';
import company5 from '../assets/img-0.16.png';
import company6 from '../assets/img-0.12.png';

function PartnersFeatured() {

    const collaborators = [
        { name: 'Company 1', logo: company1 },
        { name: 'Company 2', logo: company2 },
        { name: 'Company 3', logo: company3 },
        { name: 'Company 4', logo: company4 },
        { name: 'Company 5', logo: company5 },
        { name: 'Company 6', logo: company6 },
      ];

  return (
    <div className="container-fluid">
       <h1 className="text-center mt-5 mb-4">Partners & Featured In</h1>
       <div className="row justify-content-center">
           {collaborators.map((company, index) => (
           <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex justify-content-center align-items-center">
            <img
             src={company.logo}
             alt={`${company.name} logo`}
             className="img-fluid logo"
            />
           </div>
           ))}
       </div>
    </div>
);
}

export default PartnersFeatured;