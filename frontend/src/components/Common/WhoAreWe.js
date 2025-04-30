import React from 'react';
import OfficeImg from '../../assets/img-0.2.jpg';
import { useFunctions } from '../../useFunctions';
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';





function WhoAreWe() {
  const { paragraphText, subText } = useFunctions();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/about'); // Navigate to the About page when the button is clicked
  }

  return (
    <div className="WhoAreWe container-fluid bg-light rounded-bottom-custom">
        <div className="row justify-content-center align-items-center py-5">
          <div className="WhoAreWeImg col-md-5 mb-4 mb-md-0">
            <img src={OfficeImg} className="img-fluid rounded" alt="Loading..." />
          </div>
          <div className="WhoAreWeContent col-md-5 text-center d-flex flex-column justify-content-center gap-4">
            <h1 className="WhoAreWeHeader display-4 font-weight-bold">Who are we?</h1>
            <p className="WhoAreWeText lead my-4 text-lg">
                {paragraphText ? paragraphText:
                `                
                IDEA-Venture is a groundbreaking digital
                platform connecting entrepreneurs with
                investors. By addressing inefficiencies,
                security risks, and fragmented funding
                access in traditional systems, IDEAVenture offers a seamless, secure, and
                user-friendly investment experience.
                `
                }  
            </p>
            <p className="WhoAreWeSubText text-lg">
                {subText ? subText:
                `Our platform integrates advanced matchmaking algorithms, robust security
                features, and comprehensive support
                services, paving the way for
                entrepreneurial growth and strategic
                investments.`
                }
            </p>
            <Button
              onClick={handleButtonClick}
              className="bg-gradient-to-r from-[#0029A4] to-[#0031c9] text-white hover:bg-gradient-to-bl focus:ring-[#D9EFFF] dark:focus:ring-[#0029A4] w-50 align-self-center rounded-full border-1-solid border-[#ffff] shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              View More
            </Button>
          </div>
        </div>
      </div>
);
}

export default WhoAreWe;