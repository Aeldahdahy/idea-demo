import React from 'react';
import { motion } from 'framer-motion';
import arrorImage from '../../../assets/img-0.48.png';
import { useNavigate } from 'react-router-dom';

function ClientEntreMyProjects() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/client-portal/entrepreneur/entreProjectData');
  }

  return (
    <>
    <div className='spacemax'></div>
    <div className="container" onClick={handleClick}>
      <style>
        {`
          .container {
          padding: 20px;
              margin-top: 24px;
              display: flex;
              justify-content: center;
              overflow: hidden;
          }

          .card {
            position: relative;
            height: 500px;
            width: 100%;
            max-width: 350px;
            padding: 24px;
            border-radius: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background: linear-gradient(145deg, #f8fbff, #e0e6ef);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            transition: all 0.3s ease-in-out;
          }

          .card-content {
            display: flex;
            align-items: center;
            gap: 60px;
            flex-direction: column;
          }

          .add-button {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(145deg, #007bff, #0056b3);
            border: none;
            color: white;
            font-size: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .add-button:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 12px 30px rgba(0, 123, 255, 0.5);
          }

          .text-wrapper {
            position: relative;
          }

          .text {
            margin: 0;
            font-size: 28px;
            text-align: center;
            font-weight: bold;
            color: #333;
          }

          .arrow {
              position: absolute;
              top: 50px;
              left: 40px;
              width: 60px;
              animation: bounce 2s infinite;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>

      <motion.div 
        className="card"
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-content">
          <div className="text-wrapper">
            <motion.p 
              className="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Click here to add new pitch
            </motion.p>
            <img
              src={arrorImage}
              alt="Arrow pointing to button"
              className="arrow"
            />
          </div>
          <motion.button 
            className="add-button"
            whileTap={{ scale: 0.9 }}
          >
            +
          </motion.button>
        </div>
      </motion.div>
    </div>
    <div className='spacemax'></div>
    </>
  );
}

export default ClientEntreMyProjects;
